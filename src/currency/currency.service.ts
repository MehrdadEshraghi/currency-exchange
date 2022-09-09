import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";  
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Currency } from "./currency.model";
import { CreateCurrencyDto } from "./dto";

@Injectable()
export class CurrencyService {
  constructor(@InjectModel('Currency') private readonly currencyModel: Model<Currency>) {}

  async addCurrency(currency: CreateCurrencyDto) {
    try {
      const newCurrency = new this.currencyModel(currency);
      await newCurrency.save();
      return newCurrency.id;
    } catch(error) {
      if(error.code === 11000) {
        throw new ConflictException('An attempt was made to create an object that already exists');
      }
      throw new NotFoundException();
    }
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