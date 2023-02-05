import fetch from "node-fetch"

export class Upbit {
  baseURL = 'https://api.upbit.com/v1'
  options = {method: 'GET', headers: {accept: 'application/json'}}

  getAllMarkets(): any {
    const response = fetch(`${this.baseURL}/market/all?isDetails=false`, this.options)
    return response.then(res => res.json())
  }

  getMinutesCandles(unit: number, market: string, count=10): any {
    const response = fetch(`${this.baseURL}/candles/minutes/${unit}?market=${market}&count=${count}`, this.options)
    return response.then(res => res.json())
  }

  getDaysCandles(market: string, count=2): any {
    const response = fetch(`${this.baseURL}/candles/days?market=${market}&count=${count}`, this.options)
    response.then(res => console.log(res))
    // return response.then(res => res.json())
  }

  getTickers(markets: string): any {
    console.log(markets)
    const response = fetch(`${this.baseURL}/ticker?markets=${markets}`, this.options)

    return response.then(res => res.json())
  }
}