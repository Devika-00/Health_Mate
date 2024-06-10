"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const expressConfig = (app) => {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, morgan_1.default)("dev"));
    const corsConfig = {
        origin: "https://healthmate.dpsdev.site",
        credentials: true,
    };
    app.use((0, cors_1.default)(corsConfig));
    app.options("*", (0, cors_1.default)(corsConfig));
    app.use((0, helmet_1.default)()); // for more req security
    app.use((0, cookie_parser_1.default)());
};
exports.default = expressConfig;