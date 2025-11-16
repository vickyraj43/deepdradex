import { Injectable } from '@nestjs/common';
import { OHLCAdaptor } from 'src/integrations/adaptors/ohlc.adaptors';

@Injectable()
export class ZoneService {
    constructor(
                private readonly ohlcAdaptorService: OHLCAdaptor
    ) {
    }

    async getOHLC(symbol: string, periodFrom: string, periodTo?: string, limit?: string): Promise<any> {
        try{
            console.log('ZoneService getOHLC called with params:', { symbol, periodFrom, periodTo, limit });
            const data = await this.ohlcAdaptorService.getOHLC(symbol, periodFrom, periodTo, limit);
            console.log('OHLC data retrieved:', data);
            return data;
        }catch(err){
            throw new Error(`ZoneService getOHLC error: ${err.message}`);
        }
    }
}
