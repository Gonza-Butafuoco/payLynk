import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { CurrencyService } from './currency.service';

@Module({
  imports: [HttpModule.register({}), ConfigModule, CacheModule.register()],
  providers: [CurrencyService],
  exports: [CurrencyService],
})
export class CurrencyModule {}
