import { Injectable } from "@nestjs/common";
import { YahooFinanceOHLCStrategy } from "./yahoo.strategy";
import { OHLCStrategy } from "./ohlc.strategy";

@Injectable()
export class OHLCAdaptor {
    private readonly strategies: OHLCStrategy[];
    constructor(
        private readonly yahooFinanceService: YahooFinanceOHLCStrategy
    ) {
        this.strategies = [this.yahooFinanceService];
    }

    async getOHLC(symbol: string, periodFrom: string, periodTo?: string, limit?: string): Promise<any> {
        try{
            // For simplicity, we use the first strategy. In a real-world scenario, you might want to select based on some criteria.
            for(const strategy of this.strategies){
                console.log('Using strategy:', strategy.constructor.name);
                const data =   strategy.fetchOHLCData(symbol, periodFrom, periodTo, limit);
                console.log('OHLC data fetched:', data);
                return data;
            }
        }catch(err){
            throw new Error(`OHLCAdaptor getOHLC error: ${err.message}`);
        }
    }
}