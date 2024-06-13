"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expressConfig_1 = __importDefault(require("./frameworks/webserver/expressConfig"));
const server_1 = __importDefault(require("./frameworks/webserver/server"));
const connection_1 = __importDefault(require("./frameworks/database/mongodb/connection"));
const customError_1 = __importDefault(require("./utils/customError"));
const errorhandler_middleware_1 = __importDefault(require("./frameworks/webserver/middlewares/errorhandler.middleware"));
const routes_1 = __importDefault(require("./frameworks/webserver/routes"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const socket_1 = __importDefault(require("./frameworks/webserver/webSocket/socket"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: true,
        methods: ["GET", "POST"],
        credentials: true,
    },
});
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", 'https://*.zegocloud.com', 'https://res.cloudinary.com', 'https://api.cloudinary.com'] // Add your URL here
            // Add other directives as needed
        }
    }
}));
(0, socket_1.default)(io);
(0, expressConfig_1.default)(app);
(0, connection_1.default)();
(0, routes_1.default)(app);
(0, server_1.default)(httpServer);
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../frontend/dist/index.html"));
});
app.use(errorhandler_middleware_1.default);
app.all("*", (req, res, next) => {
    next(new customError_1.default(`Not found : ${req.url}`, 404));
});
