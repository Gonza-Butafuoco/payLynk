import { IsString, IsPositive, IsNumber } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  name: string;

  @IsNumber()
  currencyId: number;

  @IsPositive()
  @IsNumber()
  initialBalance: number;

  @IsString()
  description?: string;
}
