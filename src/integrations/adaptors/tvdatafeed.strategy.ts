import { Inject, Injectable } from "@nestjs/common";
import { TvDataFeed } from "tvdatafeedclient-js";

@Injectable()
class TvDataFeedStrategy{
    async fetchOHLCData(){
        const client = new TvDataFeed();
        console.log('client :: ', client);
        const candles = await client.getCandles("BINANCE", "BTCUSDT", "1m", 10);
        console.log('candle :: ', candles);
        return candles;
    }
}

