import { IsNotEmpty } from 'class-validator';

export class ExchangeCurrencyDto {
  @IsNotEmpty()
  source: string;
  
  @IsNotEmpty()
  target: string;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  amount: number;
}