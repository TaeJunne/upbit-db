"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_controller_1 = require("./token/token.controller");
const tokenController = new token_controller_1.TokenController();
setInterval(() => tokenController.createMinutesCandle(), 5000);
