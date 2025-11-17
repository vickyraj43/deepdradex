import { Test, TestingModule } from '@nestjs/testing';
import { STradeService } from './strade.service';

describe('TradeService', () => {
  let service: STradeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [STradeService],
    }).compile();

    service = module.get<STradeService>(STradeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
