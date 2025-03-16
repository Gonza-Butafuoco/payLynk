import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from './currency.service';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpMock: HttpService;
  let cacheManager: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'FIXER_API_KEY') return 'test_key';
              if (key === 'FIXER_BASE_URL') return 'http://fake-api';
            }),
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CurrencyService>(CurrencyService);
    httpMock = module.get<HttpService>(HttpService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  it('debería usar el cache cuando está disponible', async () => {
    jest.spyOn(cacheManager, 'get').mockResolvedValue(1.2);

    const result = await service.convertAmount('USD', 'EUR', 100);

    expect(result).toBe(120);
    expect(httpMock.get).not.toHaveBeenCalled();
    expect(cacheManager.get).toHaveBeenCalledWith('exchange_rate_USD_EUR');
  });
});
