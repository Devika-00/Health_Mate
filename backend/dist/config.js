"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configKeys = {
    PORT: process.env.PORT || 5000,
    CLIENT_PORT: process.env.CLIENT_PORT,
    MONGO_URL: process.env.MONGO_URL,
    APP_EMAIL: process.env.APP_EMAIL,
    APP_PASSWORD: process.env.APP_PASSWORD,
    ACCESS_SECRET: process.env.ACCESS_SECRET,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
};
exports.default = configKeys;
