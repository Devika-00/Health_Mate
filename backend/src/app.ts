import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import expressConfig from "./frameworks/webserver/expressConfig";
import startServer from "./frameworks/webserver/server";
import connectDB from "./frameworks/database/mongodb/connection";
import CustomError from "./utils/customError";
import errorHandlingMiddleware from "./frameworks/webserver/middlewares/errorhandler.middleware";
import routes from "./frameworks/webserver/routes";
import { createServer } from "http";
import { Server } from "socket.io";
import socketConfig from "./frameworks/webserver/webSocket/socket";
import path from "path";

const app: Application = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Set up Content Security Policy (CSP)
// Set up Content Security Policy (CSP)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "https://api.cloudinary.com", "https://res.cloudinary.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"], // Allow loading images from Cloudinary
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  })
);


socketConfig(io);
expressConfig(app);
connectDB();
routes(app);
startServer(httpServer);

// Catch-all route to serve index.html
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

// Error handling middleware
app.use(errorHandlingMiddleware);

// Catch-all route for 404 errors
app.all("*", (req, res, next: NextFunction) => {
  next(new CustomError(`Not found : ${req.url}`, 404));
});

export default app;
