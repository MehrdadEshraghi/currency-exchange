import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Post, Query } from "@nestjs/common";
import { CurrencyService } from "./currency.service";
import { CreateCurrencyDto } from "./dto";
import { ConflictException } from "@nestjs/common";
import {Currency} from './currency.model'

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  async addCurrency(@Body() newCurrency: CreateCurrencyDto): Promise<string> {
    try {
      return await this.currencyService.addCurrency(newCurrency);
    } catch(error) {
      if(error.code === 11000) {
        throw new ConflictException('An attempt was made to create an object that already exists');
      }
      throw new InternalServerErrorException();
    } 
  }

  @Get()
  async getCurrencies(@Query() query: { names: string }): Promise<Currency[]> {
    try {
      return await this.currencyService.getCurrencies(query.names ? JSON.parse(query.names) : []);
    } catch(error) {
      throw new NotFoundException();
    } 
  }
}