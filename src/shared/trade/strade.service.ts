import { Injectable } from '@nestjs/common';

interface Candle {
  date: string | Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
  adjClose?: string; // Added for clarity
}

interface CandlePattern {
    leginCandle: number;
    middleCandle: number;
    legoutCandle: number;
    prevCandle?: number
}

@Injectable()
export class STradeService {

    classifyDirection(c: Candle): 'Rally' | 'Drop' {
        return c.close > c.open ? 'Rally' : 'Drop';
    }

     // Get body percentage
  getBodyPercent(c: Candle): number {
    const body = Math.abs(c.close - c.open); 
    const range = c.high - c.low;
    return range === 0 ? 0 : (body / range) * 100;
  }

  //Check boring candle (<= 50%)
  isBoring(c: Candle): boolean {
    return this.getBodyPercent(c) <= 50;
  }

   // 4️⃣ Check valid filled candle (<= 80%)
  isFilled(c: Candle): boolean {
    return this.getBodyPercent(c) >= 50;
  }

  // 5️⃣ Detect pattern among 3 candles
  detectPattern(firstCandle: Candle , middleCandle: Candle , lastCandle: Candle ): string | null {
    const firstCandleDirection = this.classifyDirection(firstCandle);
    const lastCandleDirection = this.classifyDirection(lastCandle);

    if (!this.isFilled(firstCandle) || !this.isFilled(lastCandle)) return null;
    if (!this.isBoring(middleCandle)) return null;

    if (firstCandleDirection === 'Drop' && lastCandleDirection === 'Rally') return 'Drop-Boring-Rally';
    if (firstCandleDirection === 'Rally' && lastCandleDirection === 'Drop') return 'Rally-Boring-Drop';
    if (firstCandleDirection === 'Rally' && lastCandleDirection === 'Rally') return 'Rally-Boring-Rally';
    if (firstCandleDirection === 'Drop' && lastCandleDirection === 'Drop') return 'Drop-Boring-Drop';

    return null;
  }

  // 6 Calculate proximal and distal lines
  calculateZone(middleCandle: Candle, pattern: string) {
    switch (pattern) {
      case 'Drop-Boring-Rally':
      case 'Rally-Boring-Rally':
        return {
          type: 'Demand',
          proximal: Math.max(middleCandle?.open, middleCandle?.close),
          distal: middleCandle?.low,
        };

      case 'Rally-Boring-Drop':
      case 'Drop-Boring-Drop':
        return {
          type: 'Supply',
          proximal: Math.min(middleCandle?.open, middleCandle?.close),
          distal: middleCandle?.high,
        };

      default:
        return null;
    }
  }

  // 7️⃣ Detect all zones in date range + timeframe
  detectZones(candles: Candle[]) {
    const zones:any = [];

    for (let i = 0; i < candles.length - 2; i++) {
      const firstCandle = candles[i];
      const middleCandle = candles[i + 1];
      const lastCandle = candles[i + 2];

      const pattern = this.detectPattern(firstCandle, middleCandle, lastCandle);
      if (!pattern) continue;

      const zone = this.calculateZone(middleCandle, pattern);
      if (!zone) continue;

      zones.push({
        pattern,
        type: zone.type,
        proximal_entry_price: zone.proximal,
        distal_exit_price: zone.distal,
        entryTime: middleCandle.date,
        startIndex: i,
      });
    }

    return zones;
  }
}
