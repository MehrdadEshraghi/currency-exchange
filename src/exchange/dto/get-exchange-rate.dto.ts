import { IsNotEmpty } from 'class-validator';

export class GetExchangeRateDto {
  @IsNotEmpty()
  source: string;
  
  @IsNotEmpty()
  target: string;

  @IsNotEmpty()
  date: string;
}