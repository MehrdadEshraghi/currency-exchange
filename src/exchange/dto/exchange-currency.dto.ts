import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ExchangeCurrencyDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'EUR' })
  source: string;
  
  @IsNotEmpty()
  @ApiProperty({ example: 'USD' })
  target: string;

  @IsNotEmpty()
  @ApiProperty({ example: '1660852935177', description: 'The unix timestamp of the required date in milliseconds' })
  date: string;

  @IsNotEmpty()
  @ApiProperty({ example: 12 })
  amount: number;
}