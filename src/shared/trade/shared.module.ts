import { Module } from "@nestjs/common";
import { STradeService } from "./strade.service";


@Module({
    imports: [],
    providers: [STradeService],
    exports: []
})
export class SharedModule {}