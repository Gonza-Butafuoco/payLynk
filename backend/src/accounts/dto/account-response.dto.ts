export class AccountResponseDto {
  id: number;
  name: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
  balance: number;
  createdAt: Date;
  description?: string;
}
