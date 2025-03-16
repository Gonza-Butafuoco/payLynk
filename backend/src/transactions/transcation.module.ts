import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './entities/transaction.entity';
import { CurrencyModule } from '../currency/currency.module';
import { AccountsModule } from '../accounts/accounts.module';
import { Account } from '../accounts/entities/account.entity';
import { TransactionMapper } from './mappers/transaction.mapper';
import { Currency } from '../currency/entities/currency.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Account, Currency]),
    CurrencyModule,
    AccountsModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionMapper],
  exports: [TransactionsService],
})
export class TransactionsModule {}
