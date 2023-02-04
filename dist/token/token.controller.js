"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const token_service_1 = require("./token.service");
const tokens_1 = require("../infra/upbit/tokens");
const upbit_1 = require("../utils/upbit");
const sleep_1 = require("../utils/sleep");
class TokenController {
    constructor() {
        this.upbit = new upbit_1.Upbit();
        this.tokenService = new token_service_1.TokenService();
    }
    createMinutesCandle() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 1; i < tokens_1.krwTokens.length + 1; i++) {
                const start = Date.now();
                const responses = yield this.upbit.getMinutesCandles(30, tokens_1.krwTokens[i - 1].market, 5);
                console.log(tokens_1.krwTokens[i - 1].market);
                for (let j = responses.length - 1; j > 0; j--) {
                    const matchData = yield this.tokenService.getMunitesCandleDateTime(tokens_1.krwTokens[i - 1].en_name, responses[j].candle_date_time_kst);
                    if (matchData[0] && matchData[0].candle_date_time_utc === responses[j].candle_date_time_utc) { }
                    else {
                        yield this.tokenService.createMinutesCandle(tokens_1.krwTokens[i - 1].en_name, responses[j]);
                    }
                }
                const now = Date.now();
                if ((i % 10 == 0) && ((now - start) < 1000)) {
                    yield (0, sleep_1.sleep)(1200 - (now - start));
                }
            }
            console.log('Done');
        });
    }
    getMinutesCandleDateTime() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.TokenController = TokenController;
