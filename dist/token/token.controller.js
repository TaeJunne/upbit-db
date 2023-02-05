"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const token_service_1 = require("./token.service");
const tokens_1 = require("../infra/upbit/tokens");
const upbit_1 = require("../utils/upbit");
const sleep_1 = require("../utils/sleep");
class TokenController {
    upbit = new upbit_1.Upbit();
    tokenService = new token_service_1.TokenService();
    async createMinutesCandle() {
        console.log(`Running at ${Date.now().toLocaleString()}`);
        for (let i = 1; i < tokens_1.krwTokens.length + 1; i++) {
            const start = Date.now();
            const responses = await this.upbit.getMinutesCandles(30, tokens_1.krwTokens[i - 1].market, 3);
            console.log(tokens_1.krwTokens[i - 1].market);
            for (let j = responses.length - 1; j > 0; j--) {
                const matchData = await this.tokenService.getMunitesCandleDateTime(tokens_1.krwTokens[i - 1].en_name, responses[j].candle_date_time_kst);
                if (matchData[0] && matchData[0].candle_date_time_utc === responses[j].candle_date_time_utc) { }
                else {
                    await this.tokenService.createMinutesCandle(tokens_1.krwTokens[i - 1].en_name, responses[j]);
                }
            }
            const now = Date.now();
            if ((i % 10 == 0) && ((now - start) < 1000)) {
                await (0, sleep_1.sleep)(1200 - (now - start));
            }
        }
        console.log('Done');
    }
    async getMinutesCandleDateTime() {
    }
}
exports.TokenController = TokenController;
