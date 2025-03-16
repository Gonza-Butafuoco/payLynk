import { ApiProperty } from '@nestjs/swagger';

export class TransactionResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: () => AccountInfoDto })
  accountFrom: AccountInfoDto;

  @ApiProperty({ type: () => AccountInfoDto })
  accountTo: AccountInfoDto;

  @ApiProperty()
  originalAmount: number;

  @ApiProperty()
  convertedAmount: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  currency: string;
}

class AccountInfoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  currency: string;
}
