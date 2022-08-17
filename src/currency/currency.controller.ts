import { Body, Controller, InternalServerErrorException, Post } from "@nestjs/common";
import { CurrencyService } from "./currency.service";
import { CreateCurrencyDto } from "./dto";
import { ConflictException } from "@nestjs/common";

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  async addCurrency(@Body() newCurrency: CreateCurrencyDto) {
    try {
      return await this.currencyService.addCurrency(newCurrency);
    } catch(error) {
      if(error.code === 11000) {
        throw new ConflictException('An attempt was made to create an object that already exists');
      }
      throw new InternalServerErrorException();
    } 
  }
}