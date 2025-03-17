import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CurrencyService {
  private readonly logger = new Logger(CurrencyService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async convertAmount(
    from: string,
    to: string,
    amount: number,
  ): Promise<number> {
    const rate = await this.getExchangeRate(from, to);
    return amount * rate;
  }

  private async getExchangeRate(from: string, to: string): Promise<number> {
    const cacheKey = `exchange_rate_${from}_${to}`;
    const cachedRate = await this.cacheManager.get<number>(cacheKey);

    if (cachedRate) {
      this.logger.log(`Usando tasa cacheada para ${from}->${to}`);
      return cachedRate;
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.configService.get('FIXER_BASE_URL')}/latest`,
          {
            params: {
              access_key: this.configService.get('FIXER_API_KEY'),
              base: from,
              symbols: to,
            },
          },
        ),
      );

      if (!response.data.success) {
        throw new Error(`Fixer API error: ${response.data.error.info}`);
      }

      const rate = response.data.rates[to];

      await this.cacheManager.set(cacheKey, rate, 3600);

      return rate;
    } catch (error) {
      this.logger.error(`Error al obtener tasa de cambio: ${error.message}`);
      throw new Error('No se pudo obtener la tasa de cambio');
    }
  }
}
