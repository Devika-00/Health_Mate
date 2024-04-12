import express from "express";
import { userDbRepository } from "../../../app/interfaces/userDbRepository";
import { authService } from "../../services/authService";
import { userRepositoryMongodb } from "../../database/mongodb/repositories/userRepositoryMongodb";
import { authServiceInterface } from "../../../app/service-interface/authServiceInterface";
import userController from "../../../adapters/userController";
import authenticateUser from "../middlewares/authMiddleware";
import doctorController from "../../../adapters/doctorController";
import { doctorDbRepository } from "../../../app/interfaces/doctorDBRepository";
import { doctorRepositoryMongodb } from "../../database/mongodb/repositories/doctorRepositoryMongodb";


const userRoutes = () =>{
    const router = express.Router();

    const controller = userController(
        authServiceInterface,
        authService,
        userDbRepository,
        userRepositoryMongodb,

    );

//user Authentication Routes//

router.post("/register",controller.registerUser);
router.post("/verify_otp",controller.verifyOtp);
router.post("/resend_otp", controller.resendOtp);
router.post("/login",controller.userLogin);
router.post("/forgot_password",controller.forgotPassword);
router.post("/reset_password/:token",controller.resetPassword);

router.get("/profile", authenticateUser, controller.userProfile);
router.patch("/profile/edit", authenticateUser, controller.updateUserInfo);
return router;

};


export default userRoutes;