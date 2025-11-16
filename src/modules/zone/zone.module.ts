import { Module } from '@nestjs/common';
import { ZoneController } from './zone.controller';
import { ZoneService } from './zone.service';
import { OHLCAdaptor } from 'src/integrations/adaptors/ohlc.adaptors';
import { YahooFinanceOHLCStrategy } from 'src/integrations/adaptors/yahoo.strategy';

@Module({
  controllers: [ZoneController],
  providers: [ZoneService , OHLCAdaptor , YahooFinanceOHLCStrategy]
})
export class ZoneModule {}
