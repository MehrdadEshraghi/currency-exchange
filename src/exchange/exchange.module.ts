import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CurrencyModule } from "src/currency/currency.module";
import { ExchangeController } from "./exchange.controller";
import { ExchangeService } from "./exchange.service";
import { ExchangeRateSchema } from "./exchangeRate.model";

@Module({
  imports: [CurrencyModule, MongooseModule.forFeature([{name: 'ExchangeRate', schema: ExchangeRateSchema}])],
  controllers: [ExchangeController],
  providers: [ExchangeService]
})
export class ExchangeModule {}