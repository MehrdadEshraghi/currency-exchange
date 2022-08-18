import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CurrencyService } from "src/currency/currency.service";
import { CreateExchangeRateDto } from "./dto";
import { ExchangeRate } from "./exchangeRate.model";

@Injectable()
export class ExchangeService {
  
  constructor(@InjectModel('ExchangeRate') private readonly exchangeRateModel: Model<ExchangeRate>
  ,private readonly currencyService: CurrencyService
  ) {}

  async addExchangeRate(exchangeRate: CreateExchangeRateDto): Promise<string> {
    const doc = await this.currencyService.getCurrencies([exchangeRate.sourceCurrency, exchangeRate.targetCurrency]);

    if(doc.length < 2) {
      throw new BadRequestException();
    }

    let sourceCurrency: string, targetCurrency: string;
    if(doc[0].id === exchangeRate.sourceCurrency) {
      sourceCurrency = doc[0].id;
      targetCurrency = doc[1].id;
    } else {
      sourceCurrency = doc[1].id;
      targetCurrency = doc[0].id;
    }

    exchangeRate.sourceCurrency = sourceCurrency;
    exchangeRate.targetCurrency = targetCurrency;

    const newExchangeRate = new this.exchangeRateModel({...exchangeRate});
    await newExchangeRate.save();
    return newExchangeRate.id;
  }  
}