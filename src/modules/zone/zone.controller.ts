import { Controller, Get, Query } from '@nestjs/common';
import { OHLCAdaptor } from 'src/integrations/adaptors/ohlc.adaptors';
import { ZoneService } from './zone.service';
import { STradeService } from 'src/shared/trade/strade.service';

@Controller('zone')
export class ZoneController {
    constructor(
        private readonly zoneService: ZoneService,
        private readonly stradeService: STradeService
    ) {}
    @Get('ohlc')
    async getOHLC(
        @Query('symbol') symbol: string, 
        @Query('periodFrom') periodFrom: string, 
        @Query('periodTo') periodTo?: string, 
        @Query('limit') limit?: string
    ){
        console.log('Received OHLC request with params:', { symbol, periodFrom, periodTo, limit });
        const data = await this.zoneService.getOHLC(symbol, periodFrom, periodTo, limit);
        // const candles = [
        //         { date: '2025-11-01', open: 100, high: 110, low: 95, close: 105 },
        //         { date: '2025-11-02', open: 105, high: 107, low: 104, close: 106 },
        //         { date: '2025-11-03', open: 106, high: 115, low: 105, close: 114 },
        //         { date: '2025-11-04', open: 114, high: 120, low: 113, close: 119 },
        // ];

            // return this.stradeService.detectZones(candles);
        // return data;
        return this.stradeService.detectZones(data);
    }
}
