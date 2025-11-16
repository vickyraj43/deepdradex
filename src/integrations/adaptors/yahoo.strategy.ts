import YahooFinance from "yahoo-finance2";
import { OHLCStrategy} from "./ohlc.strategy";
import { Injector } from "@nestjs/core/injector/injector";
import { Injectable } from "@nestjs/common";

type ValidInterval = '1d' | '1wk' | '1mo';

enum Interval {
    ONE_DAY = '1d',
    ONE_WEEK = '1wk',
    ONE_MONTH = '1mo',
}

type OHLCQuery = {
    period1: string;
    period2: string;
    interval?: ValidInterval;
}

type OHLCResultType = {
    date: string,
    open: string,
    high: string,
    low: string,
    close: string,
    volume: string,
    odjClose: string
}

@Injectable()
export class  YahooFinanceOHLCStrategy extends OHLCStrategy {
    async fetchOHLCData(symbol: string, periodFrom: string, periodTo?: string, interval: string = Interval.ONE_DAY): Promise<any> {
        try {
            const yahooFinance = new YahooFinance();
            console.log('yahooFinance :: ', yahooFinance);
            const queryOptions: OHLCQuery = {
                period1: periodFrom || '2025-11-05', // from date
                period2: periodTo || '2025-11-08', // to date
                interval: this.validateInterval(interval),
            };

            const result = await yahooFinance.historical(symbol, queryOptions);
            console.log('result :: ', result);
            const resultFormated:OHLCResultType[] = result.map(candle => {
                return {
                    date: candle?.date + '',
                    open: candle?.open + '',
                    high: candle?.high + '',
                    low: candle?.low + '',
                    close: candle?.close + '',
                    volume: candle?.volume + '',
                    odjClose: candle?.adjClose + ''
                }
            })
            console.log('resultFormated :: ', resultFormated);
            return resultFormated;
        } catch (err) {
            throw new Error(`Failed to fetch OHLC data: ${err.message}`);
        }
    }

    private validateInterval(interval: string): ValidInterval {
        const validIntervals: ValidInterval[] = ['1d', '1wk', '1mo'];
        if (validIntervals.includes(interval as ValidInterval)) {
            return interval as ValidInterval;
        }
        return Interval.ONE_DAY; // Default to 1 day if invalid interval is provided
    }
}