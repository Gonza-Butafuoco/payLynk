import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_from_id' })
  accountFrom: Account;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_to_id' })
  accountTo: Account;

  @Column('decimal', { precision: 15, scale: 2 })
  originalAmount: number;

  @Column('decimal', { precision: 15, scale: 2 })
  convertedAmount: number;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column()
  currency: string;
}
