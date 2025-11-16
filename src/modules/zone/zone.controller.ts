import { Controller, Get, Query } from '@nestjs/common';
import { OHLCAdaptor } from 'src/integrations/adaptors/ohlc.adaptors';
import { ZoneService } from './zone.service';

@Controller('zone')
export class ZoneController {
    constructor(
        private readonly zoneService: ZoneService
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
        return data;
    }
}
