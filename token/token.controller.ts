import { TokenService } from "./token.service"
import { krwTokens } from "../infra/upbit/tokens"
import { Upbit } from "../utils/upbit"
import { sleep } from "../utils/sleep"

interface ResponseType {
  market: string
  candle_date_time_utc: string
  candle_date_time_kst: string
  opening_price: number
  high_price: number
  low_price: number
  trade_price: number
  timestamp: string
  candle_acc_trade_price: number
  candle_acc_trade_volume: number
  unit: number
}

export class TokenController {
  upbit = new Upbit()
  tokenService = new TokenService()

  async createMinutesCandle() {
    console.log(`Running at ${Date.now().toLocaleString()}`)
    for (let i=1; i < krwTokens.length+1; i++) {

      const start = Date.now();
      const responses: ResponseType[] = await this.upbit.getMinutesCandles(30, krwTokens[i-1].market, 3);
      // await this.tokenService.delete(krwTokens[i-1].en_name, responses[1].candle_date_time_kst)
      //   await this.tokenService.delete(krwTokens[i-1].en_name, responses[2].candle_date_time_kst)
      console.log(krwTokens[i-1].market)
      for (let j=responses.length-1; j > 0; j--) {
        const matchData = await this.tokenService.getMunitesCandleDateTime(krwTokens[i-1].en_name, responses[j].candle_date_time_kst)
        
        if (matchData[0] && matchData[0].candle_date_time_utc === responses[j].candle_date_time_utc) {}
        else {
          await this.tokenService.createMinutesCandle(krwTokens[i-1].en_name, responses[j]) 
        }
      }
      
      const now = Date.now();
      if ((i % 10 == 0) && ((now - start) < 1000)) {
        await sleep(1200 - (now - start))
      }
    }

    console.log('Done')
  }

  async getMinutesCandleDateTime() {

  }
}