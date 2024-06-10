"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//hashing password
const authService = () => {
    const encryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt(10);
        return yield bcrypt_1.default.hash(password, salt);
    });
    //compare password of input and db
    const comparePassword = (inputPassword, password) => __awaiter(void 0, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(inputPassword, password);
    });
    const getRandomString = () => crypto.randomUUID();
    //generate otp
    const generateOTP = () => {
        const otp = Math.floor(100000 + Math.random() * 900000);
        return `${otp}`;
    };
    //create access token for users 
    const createTokens = (id, name, role) => {
        const payload = {
            id,
            name,
            role,
        };
        const accessToken = jsonwebtoken_1.default.sign(payload, config_1.default.ACCESS_SECRET);
        return accessToken;
    };
    const doctorCreateTokens = (id, name, role) => {
        const payload = {
            id,
            name,
            role,
        };
        const accessToken = jsonwebtoken_1.default.sign(payload, config_1.default.ACCESS_SECRET);
        return accessToken;
    };
    return { encryptPassword, generateOTP, comparePassword, createTokens, getRandomString, doctorCreateTokens };
};
exports.authService = authService;
