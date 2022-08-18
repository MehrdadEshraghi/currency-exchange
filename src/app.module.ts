import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrencyModule } from './currency/currency.module';
import { ExchangeModule } from './exchange/exchange.module';

@Module({
  imports: [CurrencyModule, ExchangeModule, ConfigModule.forRoot(), MongooseModule.forRoot(
    process.env.DB_URL
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
