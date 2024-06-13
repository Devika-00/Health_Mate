import express, {Application} from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

const expressConfig = (app:Application)=>{
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(morgan("dev"));
    const corsConfig = {
        origin : "https://dpsdev.site",
        credentials: true,

    };

    app.use(cors(corsConfig));
    app.options("*",cors(corsConfig));
    app.use(helmet()); // for more req security
    app.use(cookieParser());
  

};

export default expressConfig;