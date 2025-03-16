import { IsNumber, IsPositive, IsString, IsDateString } from 'class-validator';

export class CreateTransferDto {
  @IsNumber()
  accountFromId: number;

  @IsNumber()
  accountToId: number;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  description: string;

  @IsDateString()
  date: Date;
}
