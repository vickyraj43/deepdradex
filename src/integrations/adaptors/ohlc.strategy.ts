export abstract class OHLCStrategy {
  abstract fetchOHLCData(
    symbol: string,
    periodFrom: string,
    periodTo?: string,
    limit?: string
  ): Promise<any>;
}