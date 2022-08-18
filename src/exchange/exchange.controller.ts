import { Body, Controller, Post } from "@nestjs/common";
import { CreateExchangeRateDto } from "./dto";
import { ExchangeService } from "./exchange.service";

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Post('rate')
  async addExchangeRate(@Body() newExchangeRate: CreateExchangeRateDto): Promise<string> {
    try {
      const result = await this.exchangeService.addExchangeRate(newExchangeRate);
      return result;
    } catch(error) {
      return error.response;
    } 
  }
}