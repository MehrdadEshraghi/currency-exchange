import { IsNotEmpty } from 'class-validator';

export class CreateExchangeRateDto {
  @IsNotEmpty()
  sourceCurrency: string;
  
  @IsNotEmpty()
  targetCurrency: string;

  @IsNotEmpty()
  exchangeRate: number;
}