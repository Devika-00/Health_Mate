"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
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
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: true,
        methods: ["GET", "POST"],
        credentials: true,
    },
});
// Serve static files from the React app
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
// Set up Content Security Policy (CSP)
// Set up Content Security Policy (CSP)
app.use(helmet_1.default.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "https://api.cloudinary.com", "https://res.cloudinary.com"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"], // Allow loading images from Cloudinary
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
    },
}));
(0, socket_1.default)(io);
(0, expressConfig_1.default)(app);
(0, connection_1.default)();
(0, routes_1.default)(app);
(0, server_1.default)(httpServer);
// Catch-all route to serve index.html
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../frontend/dist/index.html"));
});
// Error handling middleware
app.use(errorhandler_middleware_1.default);
// Catch-all route for 404 errors
app.all("*", (req, res, next) => {
    next(new customError_1.default(`Not found : ${req.url}`, 404));
});
exports.default = app;
