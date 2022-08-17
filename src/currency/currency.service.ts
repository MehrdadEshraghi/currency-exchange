import { Injectable } from "@nestjs/common";  
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Currency } from "./currency.model";
import { CreateCurrencyDto } from "./dto";

@Injectable()
export class CurrencyService {
  constructor(@InjectModel('Currency') private readonly currencyModel: Model<Currency>) {}

  async addCurrency(currency: CreateCurrencyDto) {
    const newCurrency = new this.currencyModel({...currency});
    await newCurrency.save();
    return newCurrency.id;
  }

}