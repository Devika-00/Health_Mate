import express, {Application,NextFunction,Request,Response} from "express";
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
import helmet from "helmet";


const app:Application = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  express.static(path.join(__dirname, "../../frontend/dist"))
);


socketConfig(io);
expressConfig(app);
connectDB();
routes(app);
startServer(httpServer);


app.get("*", (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, "../../frontend/dist/index.html")
  );
});


app.use(errorHandlingMiddleware);
app.all("*",(req, res, next: NextFunction)=>{
    next(new CustomError(`Not found : ${req.url}`, 404));
});