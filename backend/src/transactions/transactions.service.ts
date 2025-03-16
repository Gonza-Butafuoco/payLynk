import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { CurrencyService } from '../currency/currency.service';
import { Account } from '../accounts/entities/account.entity';
import { TransactionMapper } from './mappers/transaction.mapper';
import { InsufficientFundsException } from '../common/insufficient-funds.exception';
import { TransactionResponseDto } from './dto/transaction-response.dto';

@Injectable()
export class TransactionsService {
  private readonly logger = new Logger(TransactionsService.name);

  constructor(
    private dataSource: DataSource,
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
    private currencyService: CurrencyService,
    private transactionMapper: TransactionMapper,
  ) {}

  async transferFunds(
    transferDto: CreateTransferDto,
    userId: number,
  ): Promise<Transaction> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { accountFrom, accountTo } = await this.validateAndGetAccounts(
        transferDto,
        userId,
        queryRunner,
      );

      this.validateBalance(accountFrom, transferDto.amount);

      const convertedAmount = await this.handleCurrencyConversion(
        accountFrom,
        accountTo,
        transferDto.amount,
      );

      await this.updateBalances(
        queryRunner,
        accountFrom.id,
        accountTo.id,
        transferDto.amount,
        convertedAmount,
      );

      const savedTransaction = await this.createAndSaveTransaction(
        queryRunner,
        accountFrom,
        accountTo,
        transferDto,
        convertedAmount,
      );

      await queryRunner.commitTransaction();
      return savedTransaction;
    } catch (error) {
      await this.handleTransactionError(queryRunner, error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(
    userId: number,
    filters?: {
      from?: Date;
      to?: Date;
      accountId?: number;
    },
  ): Promise<TransactionResponseDto[]> {
    const query = this.buildBaseQuery(userId, filters);
    const transactions = await query.getMany();
    return this.transactionMapper.toDtos(transactions);
  }

  private async validateAndGetAccounts(
    transferDto: CreateTransferDto,
    userId: number,
    queryRunner: any,
  ) {
    const accountFrom = await this.getAccountWithLock(
      queryRunner,
      transferDto.accountFromId,
      userId,
    );

    const accountTo = await this.getAccount(
      queryRunner,
      transferDto.accountToId,
    );

    return { accountFrom, accountTo };
  }

  private async getAccountWithLock(
    queryRunner: any,
    accountId: number,
    userId: number,
  ) {
    const account = await queryRunner.manager
      .getRepository(Account)
      .createQueryBuilder('account')
      .setLock('pessimistic_write')
      .leftJoinAndSelect('account.currency', 'currency')
      .where('account.id = :id AND account.userId = :userId', {
        id: accountId,
        userId,
      })
      .getOne();

    if (!account) {
      throw new NotFoundException(
        'Cuenta origen no encontrada o no pertenece al usuario',
      );
    }
    return account;
  }

  private async getAccount(queryRunner: any, accountId: number) {
    const account = await queryRunner.manager
      .getRepository(Account)
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.currency', 'currency')
      .where('account.id = :id', { id: accountId })
      .getOne();

    if (!account) {
      throw new NotFoundException('Cuenta destino no encontrada');
    }
    return account;
  }

  private validateBalance(account: Account, amount: number) {
    if (account.balance < amount) {
      throw new InsufficientFundsException();
    }
  }

  private async handleCurrencyConversion(
    accountFrom: Account,
    accountTo: Account,
    amount: number,
  ) {
    if (accountFrom.currency.code === accountTo.currency.code) {
      return amount;
    }

    return this.currencyService.convertAmount(
      accountFrom.currency.code,
      accountTo.currency.code,
      amount,
    );
  }

  private async updateBalances(
    queryRunner: any,
    fromId: number,
    toId: number,
    amount: number,
    convertedAmount: number,
  ) {
    await Promise.all([
      queryRunner.manager.update(
        Account,
        { id: fromId },
        { balance: () => `balance - ${amount}` },
      ),
      queryRunner.manager.update(
        Account,
        { id: toId },
        { balance: () => `balance + ${convertedAmount}` },
      ),
    ]);
  }

  private async createAndSaveTransaction(
    queryRunner: any,
    accountFrom: Account,
    accountTo: Account,
    transferDto: CreateTransferDto,
    convertedAmount: number,
  ) {
    const transaction = this.transactionsRepository.create({
      accountFrom: { id: accountFrom.id },
      accountTo: { id: accountTo.id },
      originalAmount: transferDto.amount,
      convertedAmount,
      description: transferDto.description,
      date: new Date(),
      currency: accountTo.currency.code,
    });

    return queryRunner.manager.save(transaction);
  }

  private buildBaseQuery(
    userId: number,
    filters?: {
      from?: Date;
      to?: Date;
      accountId?: number;
    },
  ): SelectQueryBuilder<Transaction> {
    const query = this.transactionsRepository
      .createQueryBuilder('t')
      .leftJoinAndSelect('t.accountFrom', 'accountFrom')
      .leftJoinAndSelect('t.accountTo', 'accountTo')
      .leftJoinAndSelect('accountFrom.currency', 'fromCurrency')
      .leftJoinAndSelect('accountTo.currency', 'toCurrency')
      .where('accountFrom.userId = :userId OR accountTo.userId = :userId', {
        userId,
      })
      .orderBy('t.date', 'DESC');

    if (filters?.from) {
      query.andWhere('t.date >= :from', { from: filters.from });
    }
    if (filters?.to) {
      query.andWhere('t.date <= :to', { to: filters.to });
    }
    if (filters?.accountId) {
      query.andWhere(
        '(accountFrom.id = :accountId OR accountTo.id = :accountId)',
        {
          accountId: filters.accountId,
        },
      );
    }

    return query;
  }

  private async handleTransactionError(queryRunner: any, error: Error) {
    await queryRunner.rollbackTransaction();
    this.logger.error(`Transaction failed: ${error.message}`, error.stack);

    if (
      error instanceof NotFoundException ||
      error instanceof InsufficientFundsException
    ) {
      throw error;
    }
    throw new Error('Error procesando la transacción');
  }
}
