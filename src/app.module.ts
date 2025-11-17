import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YahooFinanceOHLCStrategy } from './integrations/adaptors/yahoo.strategy';
import { OHLCAdaptor } from './integrations/adaptors/ohlc.adaptors';
import { ZoneModule } from './modules/zone/zone.module';
import { SharedModule } from './shared/trade/shared.module';

@Module({
  imports: [ZoneModule , SharedModule],
  controllers: [AppController],
  providers: [AppService , YahooFinanceOHLCStrategy , OHLCAdaptor],
})
export class AppModule {}
