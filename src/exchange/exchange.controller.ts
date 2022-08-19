import { BadRequestException, Body, Controller, Get, NotFoundException, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateExchangeRateDto, GetExchangeRateDto } from "./dto";
import { ExchangeCurrencyDto } from "./dto/exchange-currency.dto";
import { ExchangeService } from "./exchange.service";
import { ExchangeRate } from "./exchangeRate.model";

@Controller('exchange')
@ApiTags('Exchange Rates')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Post('rate')
  @ApiOperation({ summary: 'Create exchange rate' })
  @ApiResponse({
    status: 200,
    description: 'The id of created exchange rate',
    type: String
  })
  async addExchangeRate(@Body() newExchangeRate: CreateExchangeRateDto): Promise<string> {
    try {
      return await this.exchangeService.addExchangeRate(newExchangeRate);
    } catch(error) {
      throw new BadRequestException();
    }
  }

  @Get('rate')
  @ApiOperation({ summary: 'Find exchange rate in given date' })
  @ApiResponse({
    status: 200,
    description: 'The found exchange rate',
    type: ExchangeRate
  })
  async getExchangeRate(@Query() query: GetExchangeRateDto): Promise<number> {
    try {
      return await this.exchangeService.getExchangeRate(query);
    } catch(error) {
      throw new NotFoundException();
    }
  }

  @Get()
  @ApiOperation({ summary: 'Convert value to a new currency' })
  @ApiResponse({
    status: 200,
    description: 'The converted value',
    type: Number
  })
  async exchangeCurrency(@Query() query: ExchangeCurrencyDto) {
    try {
      return await this.exchangeService.exchangeCurrency(query);
    } catch(error) {
      throw new NotFoundException();
    }
  }
  
}