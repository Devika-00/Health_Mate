import express from "express";
import { authServiceInterface } from "../../../app/service-interface/authServiceInterface";
import { authService } from "../../services/authService";
import { doctorDbRepository } from "../../../app/interfaces/doctorDBRepository";
import { doctorRepositoryMongodb, doctorRepositoryMongodbType } from "../../database/mongodb/repositories/doctorRepositoryMongodb";
import {authenticateDoctor} from "../middlewares/authMiddleware";
import doctorController from "../../../adapters/doctorController";
import { timeSlotDbRepository } from "../../../app/interfaces/timeSlotDbRepository";
import {  timeSlotRepositoryMongodb } from "../../database/mongodb/repositories/timeSlotRepositotyMongodb";




const doctorRoute = () => {
    const router = express.Router();

    //doctor controller
    const controller = doctorController(
        authServiceInterface,
        authService,
        doctorDbRepository,
        doctorRepositoryMongodb,
        timeSlotDbRepository,
        timeSlotRepositoryMongodb
    );


    router.post("/signup", controller.signup);
    router.post("/verify_token/:token", controller.verifyToken);
    router.post("/google_signIn", controller.googleSignIn);
    router.post("/login", controller.login);
    
    router.get("/profile",authenticateDoctor,controller.doctorProfile);
    router.patch("/profile/edit",authenticateDoctor,controller.updateDoctorInfo);
    router.get("/status",authenticateDoctor,controller.doctorStatus);
    router.post("/schedule",authenticateDoctor,controller.scheduleTime);
    router.get("/timeslots",authenticateDoctor,controller.getTimeSlots)
    router.delete("/deleteTime/:id",authenticateDoctor,controller.removeTimeSlot)
    
    return router;
}

export default doctorRoute;
