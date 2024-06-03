import { Router } from "express";
import adminController from "../../../adapters/adminController";
import { authServiceInterface } from "../../../app/service-interface/authServiceInterface";
import { authService } from "../../services/authService";
import { authenticateAdmin } from "../middlewares/authMiddleware";
import { userDbRepository } from "../../../app/interfaces/userDbRepository";
import { userRepositoryMongodb } from "../../database/mongodb/repositories/userRepositoryMongodb";
import { doctorDbRepository } from "../../../app/interfaces/doctorDBRepository";
import { doctorRepositoryMongodb } from "../../database/mongodb/repositories/doctorRepositoryMongodb";



export default () =>{
    const router = Router();

    const controller = adminController(
        authServiceInterface,
        authService,
        userDbRepository,
        userRepositoryMongodb,
        doctorDbRepository,
        doctorRepositoryMongodb,
    );

    router.post("/login", controller.adminLogin);
    router.get("/users",authenticateAdmin, controller.getAllUser);
    router.get("/doctors",authenticateAdmin, controller.getAllTheDoctors);
    router.get("/appoinments",authenticateAdmin, controller.getAllAppoinments);
    router.patch("/block_user/:id",authenticateAdmin, controller.userBlock);
    router.patch("/block_doctor/:id",authenticateAdmin, controller.doctorBlock);
    router.get("/doctors/:id",authenticateAdmin, controller.doctorDetails);
    router.patch("/verify_doctor/:id",authenticateAdmin, controller.VerifyDoctor);
    router.patch("/verify_doctor_rejection/:id",authenticateAdmin,controller.rejectionDoctor);
    

    return router;
};