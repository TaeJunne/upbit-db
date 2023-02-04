import express from 'express'
import { TokenController } from './token/token.controller'
const app = express();

const tokenController = new TokenController()
tokenController.createMinutesCandle()

app.listen(5000, () => {
  console.log(`✅ START CONNECTION 🚀 `)
})

