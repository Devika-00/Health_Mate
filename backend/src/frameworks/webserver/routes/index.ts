import { Application } from "express";
import userRoutes from "./userRoutes";
import doctorRoutes from "./doctorRoutes"
import adminRoutes from "./adminRoute"
import tokenRoutes from "./tokenRoute"

const routes = (app: Application) => {
    app.use("/api/user", userRoutes());
    app.use("/api/doctor",doctorRoutes());
    app.use("/api/admin",adminRoutes());
    app.use("/api/token", tokenRoutes());

};

export default routes;