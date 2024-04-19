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
    router.get("/users", controller.getAllUser);
    router.get("/doctors", controller.getAllDoctors);
    router.patch("/block_user/:id", controller.userBlock);
    router.patch("/block_doctor/:id", controller.doctorBlock);
    

    return router;
};