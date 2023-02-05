import pool from "../config/database"
import { CreateMinutesCandleDto } from "./dtos/create-candle-data"

export class TokenService {

  async createMinutesCandle(tokenName: string, data: CreateMinutesCandleDto): Promise<any> {
    const result = await pool.query(
      `insert into ${tokenName}(
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
        values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
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
        ]
    )
  
    return result[0]
  }

  async getMunitesCandleDateTime(tokenName: string, candle_date_time_kst: string): Promise<any> {
    const result = await pool.query(
      `select candle_date_time_utc from ${tokenName} where candle_date_time_kst = ?`,
      [candle_date_time_kst]
    )

    return result[0]
  }

  async delete(tokenName: string, candle_date_time_kst: string): Promise<any> {
    const result = await pool.query(
      `delete from ${tokenName} where candle_date_time_kst = '${candle_date_time_kst}'`
    )

    return result[0]
  }
}
