"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const token_controller_1 = require("./token/token.controller");
const app = (0, express_1.default)();
app.listen(5000, () => {
    console.log(`✅ START CONNECTION 🚀 `);
});
const tokenController = new token_controller_1.TokenController();
setInterval(tokenController.createMinutesCandle, 3600000);