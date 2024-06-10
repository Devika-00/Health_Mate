"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoutes_1 = __importDefault(require("./userRoutes"));
const doctorRoutes_1 = __importDefault(require("./doctorRoutes"));
const adminRoute_1 = __importDefault(require("./adminRoute"));
const tokenRoute_1 = __importDefault(require("./tokenRoute"));
const chatRoute_1 = __importDefault(require("./chatRoute"));
const routes = (app) => {
    app.use("/api/user", (0, userRoutes_1.default)());
    app.use("/api/doctor", (0, doctorRoutes_1.default)());
    app.use("/api/admin", (0, adminRoute_1.default)());
    app.use("/api/token", (0, tokenRoute_1.default)());
    app.use("/api/chat", (0, chatRoute_1.default)());
};
exports.default = routes;
