import { Injectable, NotFoundException } from "@nestjs/common";  
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Currency } from "./currency.model";
import { CreateCurrencyDto } from "./dto";

@Injectable()
export class CurrencyService {
  constructor(@InjectModel('Currency') private readonly currencyModel: Model<Currency>) {}

  async addCurrency(currency: CreateCurrencyDto) {
    const newCurrency = new this.currencyModel(currency);
    await newCurrency.save();
    return newCurrency.id;
  }

  async getCurrencies(names: string[]) {
    names = names.filter((name, index) => names.indexOf(name) === index);

    const namesObj = names.map((name) => ({ name }));
    
    const filter = {
      $or: [...namesObj]
    };

    const doc = await this.currencyModel.find(names.length === 0 ? {} : filter).exec();
    if(!doc.length || doc.length < names.length) {
      throw new NotFoundException();
    }

    return doc;
  }
}