import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CurrencyController } from "./currency.controller";
import { CurrencySchema } from "./currency.model";
import { CurrencyService } from "./currency.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Currency", schema: CurrencySchema }])],
  controllers: [CurrencyController],
  providers: [CurrencyService]
})
export class CurrencyModule {}