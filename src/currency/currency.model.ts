import * as mongoose from 'mongoose';

export const CurrencySchema = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
});

export interface Currency extends mongoose.Document {
  name: string;
  symbol: string;
};