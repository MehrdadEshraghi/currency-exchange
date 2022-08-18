import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const ExchangeRateSchema = new mongoose.Schema({
  sourceCurrency: { type: ObjectId, ref: 'Currency' },
  targetCurrency: { type: ObjectId, ref: 'Currency' },
  exchangeRate: { type: Number, required: true},
  date: { type: Date, default: Date.now }
});


export interface ExchangeRate extends mongoose.Document {
  sourceCurrency: string;
  targetCurrency: string;
  exchangeRate: number;
  date: Date
};