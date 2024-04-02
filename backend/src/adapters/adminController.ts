import { NextFunction, Request, Response } from "express";
import { AuthService } from "../frameworks/services/authService";
import { HttpStatus } from "../types/httpStatus";
import {loginAdmin} from "../app/use-cases/Admin/adminAuth"
import { AuthServiceInterfaceType } from "../app/service-interface/authServiceInterface";
import { userDbInterface } from "../app/interfaces/userDbRepository";
import { userRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/userRepositoryMongodb";
import { doctorDbInterface } from "../app/interfaces/doctorDBRepository";
import { doctorRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/doctorRepositoryMongodb";

// adminAuthController
export default (
    authServiceInterface: AuthServiceInterfaceType,
    authServiceImpl: AuthService,
    userDbRepository: userDbInterface,
    userDbRepositoryImpl: userRepositoryMongodbType,
    restaurantDbRepository:doctorDbInterface,
    restaurantDbRepositoryImpl: doctorRepositoryMongodbType,
   
  ) => {
    const dbUserRepository = userDbRepository(userDbRepositoryImpl());
    const dbResaurantRepository = restaurantDbRepository(restaurantDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());


const adminLogin = async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    try{
        const {email,password} = req.body;
        const accessToken = await loginAdmin(
            email,
            password,
            authService
        );
        res.cookie("access_token",accessToken,{
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        });
        return res.status(HttpStatus.OK).json({
            success: true,
            message: "Admin login success",
            admin: { name: "Admin User", role: "admin" },
          });
    }catch(error){
        next(error);
    }
    
}
        return {
            adminLogin,
        }

}  
