import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Currency } from '../currency/entities/currency.entity';
import { User } from '../users/entities/user.entity';
import { AccountResponseDto } from './dto/account-response.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
    @InjectRepository(Currency)
    private currencyRepository: Repository<Currency>,
  ) {}

  async create(
    user: User,
    createAccountDto: CreateAccountDto,
  ): Promise<Account> {
    const currency = await this.validateCurrency(createAccountDto.currencyId);

    const account = this.accountsRepository.create({
      ...createAccountDto,
      user,
      currency,
      balance: createAccountDto.initialBalance,
    });

    return this.accountsRepository.save(account);
  }

  async findAll(userId: number): Promise<AccountResponseDto[]> {
    const accounts = await this.accountsRepository.find({
      where: { user: { id: userId } },
      relations: ['currency'],
    });

    return accounts.map((account) => this.toResponseDto(account));
  }

  async findOne(userId: number, id: number): Promise<AccountResponseDto> {
    const account = await this.validateAccountOwnership(userId, id);
    return this.toResponseDto(account);
  }

  async update(
    userId: number,
    id: number,
    updateDto: UpdateAccountDto,
  ): Promise<AccountResponseDto> {
    const account = await this.validateAccountOwnership(userId, id);

    if (updateDto.currencyId) {
      account.currency = await this.validateCurrency(updateDto.currencyId);
    }

    const updated = await this.accountsRepository.save({
      ...account,
      ...updateDto,
    });

    return this.toResponseDto(updated);
  }

  async remove(userId: number, id: number): Promise<void> {
    const account = await this.validateAccountOwnership(userId, id);
    await this.accountsRepository.remove(account);
  }

  private async validateCurrency(currencyId: number): Promise<Currency> {
    const currency = await this.currencyRepository.findOneBy({
      id: currencyId,
    });
    if (!currency) {
      throw new NotFoundException('Currency not found');
    }
    return currency;
  }

  private async validateAccountOwnership(
    userId: number,
    accountId: number,
  ): Promise<Account> {
    const account = await this.accountsRepository.findOne({
      where: { id: accountId },
      relations: ['user', 'currency'],
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (account.user.id !== userId) {
      throw new ForbiddenException('You dont own this account');
    }

    return account;
  }

  private toResponseDto(account: Account): AccountResponseDto {
    return {
      id: account.id,
      name: account.name,
      currency: {
        code: account.currency.code,
        name: account.currency.name,
        symbol: account.currency.symbol,
      },
      balance: account.balance,
      createdAt: account.createdAt,
      description: account.description,
    };
  }
}
