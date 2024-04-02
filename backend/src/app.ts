import express, {Application,NextFunction} from "express";
import expressConfig from "./frameworks/webserver/expressConfig";
import startServer from "./frameworks/webserver/server";
import connectDB from "./frameworks/database/mongodb/connection";
import CustomError from "./utils/customError";
import errorHandlingMiddleware from "./frameworks/webserver/middlewares/errorhandler.middleware";
import routes from "./frameworks/webserver/routes";

const app:Application = express();

expressConfig(app);
connectDB();
routes(app);
startServer(app);

app.use(errorHandlingMiddleware);
app.all("*",(req, res, next: NextFunction)=>{
    next(new CustomError(`Not found : ${req.url}`, 404));
});