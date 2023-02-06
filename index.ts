import { TokenController } from './token/token.controller'

const tokenController = new TokenController()

setInterval(tokenController.createMinutesCandle, 10000)
