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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const database_1 = __importDefault(require("../config/database"));
class TokenService {
    createMinutesCandle(tokenName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query(`insert into ${tokenName}(
        market,
        candle_date_time_utc,
        candle_date_time_kst,
        opening_price,
        high_price,
        low_price,
        trade_price,
        timestamp,
        candle_acc_trade_price,
        candle_acc_trade_volume,
        unit)
        values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                data.market,
                data.candle_date_time_utc,
                data.candle_date_time_kst,
                data.opening_price,
                data.high_price,
                data.low_price,
                data.trade_price,
                data.timestamp,
                data.candle_acc_trade_price,
                data.candle_acc_trade_volume,
                data.unit
            ]);
            return result[0];
        });
    }
    getMunitesCandleDateTime(tokenName, candle_date_time_kst) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query(`select candle_date_time_utc from ${tokenName} where candle_date_time_kst = ?`, [candle_date_time_kst]);
            return result[0];
        });
    }
    delete(tokenName, candle_date_time_kst) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query(`delete from ${tokenName} where candle_date_time_kst = '${candle_date_time_kst}'`);
            return result[0];
        });
    }
}
exports.TokenService = TokenService;
