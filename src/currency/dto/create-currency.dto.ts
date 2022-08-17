import { IsNotEmpty } from 'class-validator';

export class CreateCurrencyDto {
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  symbol: string;
}