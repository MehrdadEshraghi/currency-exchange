import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const ExchangeRateSchema = new mongoose.Schema({
  sourceCurrency: { type: ObjectId, ref: 'Currency' },
  targetCurrency: { type: ObjectId, ref: 'Currency' },
  exchangeRate: { type: Number, required: true},
  date: { type: Date, default: Date.now }
});


export class ExchangeRate {
  @ApiProperty({ example: 'EUR', description: 'The ISO name of source currency' })
  sourceCurrency: string;

  @ApiProperty({ example: 'USD', description: 'The ISO name of target currency' })
  targetCurrency: string;

  @ApiProperty({ example: 1.02, description: 'The exchange rate between two currencies' })
  exchangeRate: number;

  date: Date
};