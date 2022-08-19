import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetExchangeRateDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'EUR' })
  source: string;
  
  @IsNotEmpty()
  @ApiProperty({ example: 'USD' })
  target: string;

  @IsNotEmpty()
  @ApiProperty({ example: '1660852935177', description: 'The unix timestamp of the required date in milliseconds' })
  date: string;
}