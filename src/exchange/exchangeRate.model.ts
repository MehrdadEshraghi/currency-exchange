import * as mongoose from 'mongoose';
import { CurrencySchema } from 'src/currency/currency.model';
import { ObjectId } from 'mongoose';

export const ExchangeRateSchema = new mongoose.Schema({
  sourceCurrency: CurrencySchema,
  targetCurrency: CurrencySchema,
  date: { type: Date, default: new Date }
});

export interface Currency extends mongoose.Document {
  sourceCurrency: ObjectId;
  targetCurrency: ObjectId;
  date: Date
};