import express from "express";
import { authServiceInterface } from "../../../app/service-interface/authServiceInterface";
import { authService } from "../../services/authService";
import { doctorDbRepository } from "../../../app/interfaces/doctorDBRepository";
import { doctorRepositoryMongodb, doctorRepositoryMongodbType } from "../../database/mongodb/repositories/doctorRepositoryMongodb";
import {authenticateDoctor} from "../middlewares/authMiddleware";
import doctorController from "../../../adapters/doctorController";




const doctorRoute = () => {
    const router = express.Router();

    //doctor controller
    const controller = doctorController(
        authServiceInterface,
        authService,
        doctorDbRepository,
        doctorRepositoryMongodb,
    );


    router.post("/signup", controller.signup);
    router.post("/verify_token/:token", controller.verifyToken);
    router.post("/google_signIn", controller.googleSignIn);
    router.post("/login", controller.login);
    
    router.get("/profile",authenticateDoctor,controller.doctorProfile);
    router.patch("/profile/edit",authenticateDoctor,controller.updateDoctorInfo);

    return router;
}

export default doctorRoute;
