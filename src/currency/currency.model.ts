import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const CurrencySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  symbol: { type: String, required: true },
});

export class Currency {
  _id: typeof ObjectId;

  @ApiProperty({ example: 'USD', description: 'The ISO name of the currency' })
  name: string;

  @ApiProperty({ example: '$', description: 'The symbol of the currency' })
  symbol: string;
};