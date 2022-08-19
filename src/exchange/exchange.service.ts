import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CurrencyService } from "src/currency/currency.service";
import { CreateExchangeRateDto, GetExchangeRateDto } from "./dto";
import { ExchangeCurrencyDto } from "./dto/exchange-currency.dto";
import { ExchangeRate } from "./exchangeRate.model";

@Injectable()
export class ExchangeService {
  
  constructor(@InjectModel('ExchangeRate') private readonly exchangeRateModel: Model<ExchangeRate>
  ,private readonly currencyService: CurrencyService
  ) {}

  async addExchangeRate(exchangeRate: CreateExchangeRateDto): Promise<string> {
    const [sourceCurrency, targetCurrency] = await this.getCurrencyIds(exchangeRate.sourceCurrency, exchangeRate.targetCurrency);

    exchangeRate.sourceCurrency = sourceCurrency;
    exchangeRate.targetCurrency = targetCurrency;

    const newExchangeRate = new this.exchangeRateModel({...exchangeRate});
    await newExchangeRate.save();
    return newExchangeRate.id;
  }

  async getExchangeRate(query: GetExchangeRateDto) {
    const [sourceCurrency, targetCurrency] = await this.getCurrencyIds(query.source, query.target);
    const filter = {
      sourceCurrency,
      targetCurrency,
      date: query.date,
    }
    const doc = await this.exchangeRateModel.findOne(filter, { exchangeRate: 1 });

    if(!doc) {
      throw new NotFoundException();
    }
    
    return doc.exchangeRate;
  }

  async exchangeCurrency(query: ExchangeCurrencyDto) {
    const rate = await this.getExchangeRate(query);
    if(!rate) {
      throw new NotFoundException();
    }
    return rate * query.amount;
  }

  private async getCurrencyIds(source: string, target: string): Promise<[string, string]> {
    const doc = await this.currencyService.getCurrencies([source, target]);

    if(doc.length !== 2) {
      throw new BadRequestException();
    }

    let sourceCurrency: string, targetCurrency: string;
    if(doc[0].name === source) {
      sourceCurrency = doc[0].id;
      targetCurrency = doc[1].id;
    } else {
      sourceCurrency = doc[1].id;
      targetCurrency = doc[0].id;
    }

    return [sourceCurrency, targetCurrency];
  }
}