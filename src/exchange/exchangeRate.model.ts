import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const ExchangeRateSchema = new mongoose.Schema({
  sourceCurrency: { type: ObjectId, ref: 'Currency' },
  targetCurrency: { type: ObjectId, ref: 'Currency' },
  date: { type: Date, default: new Date }
});


export interface ExchangeRate extends mongoose.Document {
  sourceCurrency: string;
  targetCurrency: string;
  date: Date
};