import express from "express";
import { userDbRepository } from "../../../app/interfaces/userDbRepository";
import { authService } from "../../services/authService";
import { userRepositoryMongodb } from "../../database/mongodb/repositories/userRepositoryMongodb";
import { authServiceInterface } from "../../../app/service-interface/authServiceInterface";
import userController from "../../../adapters/userController";




const userRoutes = () =>{
    const router = express.Router();

    const controller = userController(
        authServiceInterface,
        authService,
        userDbRepository,
        userRepositoryMongodb
    );

//user Authentication Routes//

router.post("/register",controller.registerUser);
router.post("/verify_otp",controller.verifyOtp);
router.post("/resend_otp", controller.resendOtp);
router.post("/login",controller.userLogin);


return router;

};


export default userRoutes;