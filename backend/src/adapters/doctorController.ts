import {Request,Response,NextFunction} from "express";
import { AuthServiceInterfaceType, authServiceInterface } from "../app/service-interface/authServiceInterface";
import { AuthService } from "../frameworks/services/authService";
import { HttpStatus } from "../types/httpStatus";
import { doctorDbInterface } from "../app/interfaces/doctorDBRepository";
import { doctorRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/doctorRepositoryMongodb";
import {
    addNewDoctor,
    verifyAccount,
    doctorLogin,
} from "../app/use-cases/doctor/authDoctor"


const doctorController = (
    authServiceInterface:AuthServiceInterfaceType,
    authServiceImpl : AuthService,
    doctorDbRepository :doctorDbInterface,
    doctorDbRepositoryImpl:doctorRepositoryMongodbType,
) => {
    const authService = authServiceInterface(authServiceImpl());
    const dbRepositoryDoctor = doctorDbRepository(doctorDbRepositoryImpl());

    // doctor signup method POST

    const signup = async (req:Request,res:Response,next:NextFunction)=>{
        try{
            const doctordata = req.body;
            const registerDoctor = await addNewDoctor(
                doctordata,
                dbRepositoryDoctor,
                authService
            );
            if(registerDoctor){
                return res.status(HttpStatus.OK).json({
                    success:true,
                    message:"Registration success, please verify your email that we sent to your mail"
                });
            }
        }catch(error){
            next(error);
        };
    }


    //verify account of doctor

    const verifyToken = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {
          const { token } = req.params;
    
          const verifying = await verifyAccount(token, dbRepositoryDoctor);
          if (verifying)
            return res.status(HttpStatus.OK).json({
              success: true,
              message: "Account is verified, you can login.",
            });
        } catch (error) {
          next(error);
        }
      };

      // login doctor method POST

      const login = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { email, password } = req.body;
    
          const { accessToken, isEmailExist } = await doctorLogin(
            email,
            password,
            dbRepositoryDoctor,
            authService
          );
          res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          });
          return res.status(HttpStatus.OK).json({
            success: true,
            message: "Login successful",
            doctor: isEmailExist,
          });
        } catch (error) {
          next(error);
        }
      };
    

    return {
        signup,
        verifyToken,
        login,
    }
}




export default doctorController;