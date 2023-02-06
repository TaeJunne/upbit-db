"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Upbit = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
class Upbit {
    constructor() {
        this.baseURL = 'https://api.upbit.com/v1';
        this.options = { method: 'GET', headers: { accept: 'application/json' } };
    }
    getAllMarkets() {
        const response = (0, node_fetch_1.default)(`${this.baseURL}/market/all?isDetails=false`, this.options);
        return response.then(res => res.json());
    }
    getMinutesCandles(unit, market, count = 10) {
        const response = (0, node_fetch_1.default)(`${this.baseURL}/candles/minutes/${unit}?market=${market}&count=${count}`, this.options);
        return response.then(res => res.json());
    }
    getDaysCandles(market, count = 2) {
        const response = (0, node_fetch_1.default)(`${this.baseURL}/candles/days?market=${market}&count=${count}`, this.options);
        response.then(res => console.log(res));
        // return response.then(res => res.json())
    }
    getTickers(markets) {
        console.log(markets);
        const response = (0, node_fetch_1.default)(`${this.baseURL}/ticker?markets=${markets}`, this.options);
        return response.then(res => res.json());
    }
}
exports.Upbit = Upbit;
