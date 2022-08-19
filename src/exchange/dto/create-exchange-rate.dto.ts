import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateExchangeRateDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'EUR' })
  sourceCurrency: string;
  
  @IsNotEmpty()
  @ApiProperty({ example: 'USD' })
  targetCurrency: string;

  @IsNotEmpty()
  @ApiProperty({ example: 1.02 })
  exchangeRate: number;
}