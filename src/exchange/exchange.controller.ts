import { BadRequestException, Body, Controller, Get, NotFoundException, Post, Query } from "@nestjs/common";
import { CreateExchangeRateDto, GetExchangeRateDto } from "./dto";
import { ExchangeCurrencyDto } from "./dto/exchange-currency.dto";
import { ExchangeService } from "./exchange.service";

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Post('rate')
  async addExchangeRate(@Body() newExchangeRate: CreateExchangeRateDto): Promise<string> {
    try {
      return await this.exchangeService.addExchangeRate(newExchangeRate);
    } catch(error) {
      throw new BadRequestException();
    }
  }

  @Get('rate') 
  async getExchangeRate(@Query() query: GetExchangeRateDto): Promise<number> {
    try {
      return await this.exchangeService.getExchangeRate(query);
    } catch(error) {
      throw new NotFoundException();
    }
  }

  @Get()
  async exchangeCurrency(@Query() query: ExchangeCurrencyDto) {
    try {
      return await this.exchangeService.exchangeCurrency(query);
    } catch(error) {
      throw new NotFoundException();
    }
  }
  
}