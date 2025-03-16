import { Injectable } from '@nestjs/common';
import { Transaction } from '../entities/transaction.entity';
import { TransactionResponseDto } from '../dto/transaction-response.dto';

@Injectable()
export class TransactionMapper {
  toDto(transaction: Transaction): TransactionResponseDto {
    return {
      id: transaction.id,
      accountFrom: {
        id: transaction.accountFrom.id,
        currency: transaction.accountFrom.currency.code,
      },
      accountTo: {
        id: transaction.accountTo.id,
        currency: transaction.accountTo.currency.code,
      },
      originalAmount: transaction.originalAmount,
      convertedAmount: transaction.convertedAmount,
      description: transaction.description,
      date: transaction.date,
      currency: transaction.currency,
    };
  }

  toDtos(transactions: Transaction[]): TransactionResponseDto[] {
    return transactions.map((t) => this.toDto(t));
  }
}
