import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { TransactionResponseDto } from './dto/transaction-response.dto';
import { TransactionMapper } from './mappers/transaction.mapper';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly transactionMapper: TransactionMapper,
  ) {}

  @Get()
  async getTransactions(
    @GetUser() user: User,
    @Query('from') from?: Date,
    @Query('to') to?: Date,
    @Query('sourceAccountId') sourceAccountId?: number,
  ): Promise<TransactionResponseDto[]> {
    return this.transactionsService.findAll(user.id, {
      from,
      to,
      accountId: sourceAccountId ? Number(sourceAccountId) : undefined,
    });
  }

  @Post('transfer')
  async createTransfer(
    @GetUser() user: User,
    @Body() transferDto: CreateTransferDto,
  ): Promise<TransactionResponseDto> {
    const transactionEntity = await this.transactionsService.transferFunds(
      transferDto,
      user.id,
    );
    return this.transactionMapper.toDto(transactionEntity);
  }
}
