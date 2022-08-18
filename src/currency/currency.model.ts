import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const CurrencySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  symbol: { type: String, required: true },
});

export interface Currency extends mongoose.Document {
  _id: typeof ObjectId;
  name: string;
  symbol: string;
};