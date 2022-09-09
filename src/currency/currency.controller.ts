import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Post, Query } from "@nestjs/common";
import { CurrencyService } from "./currency.service";
import { CreateCurrencyDto } from "./dto";
import { Currency } from './currency.model';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller('currency')
@ApiTags('Currencies')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  @ApiOperation({ summary: 'Create currency' })
  @ApiResponse({ status: 200, type: String, description: 'The new currency id' })
  async addCurrency(@Body() newCurrency: CreateCurrencyDto): Promise<string> {
    try {
      return await this.currencyService.addCurrency(newCurrency);
    } catch(error) {
      return error.response;
    } 
  }

  @Get()
  @ApiOperation({summary: 'Find currencies'})
  @ApiResponse({ status: 200, description: 'The found records', type: Currency})
  async getCurrencies(@Query() query: { names: string }): Promise<Currency[]> {
    try {
      return await this.currencyService.getCurrencies(query.names ? JSON.parse(query.names) : []);
    } catch(error) {
      throw new NotFoundException();
    } 
  }
}