import { BadRequestException, Body, Controller, Get, NotFoundException, Post, Query } from "@nestjs/common";
import { CreateExchangeRateDto, GetExchangeRateDto } from "./dto";
import { ExchangeService } from "./exchange.service";
import { ExchangeRate } from "./exchangeRate.model";

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
  
}