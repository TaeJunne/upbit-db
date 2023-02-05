import express from 'express'
import { TokenController } from './token/token.controller'
const app = express();

const tokenController = new TokenController()

setInterval(tokenController.createMinutesCandle, 30 * 60 * 1000)

app.listen(5000, () => {
  console.log(`✅ START CONNECTION 🚀 `)
})

