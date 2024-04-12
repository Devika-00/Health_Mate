import { NextFunction,Request,Response } from "express";
import asynchandler from "express-async-handler";
import { 
    userRegister,
    verifyOtpUser,
    login,
    deleteOtp,
    sendResetVerificationCode,
    verifyTokenAndRestPassword,
  
} from "../app/use-cases/user/auth/userAuth";
import {getUserProfile,
        updateUser} from "../app/use-cases/user/read & update/profile";
import { userDbInterface } from "../app/interfaces/userDbRepository";
import { userRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/userRepositoryMongodb";
import { AuthService } from "../frameworks/services/authService";
import { AuthServiceInterfaceType} from "../app/service-interface/authServiceInterface";
import { HttpStatus } from "../types/httpStatus";


const userController=(
    authServiceInterface: AuthServiceInterfaceType,
    authServiceImpl:AuthService,
    userDbRepository: userDbInterface,
   userRepositoryImpl: userRepositoryMongodbType,
)=>{
    const dbRepositoryUser = userDbRepository(userRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    
    // Register User POST - Method
    
    const registerUser = async(
        req:Request,
        res:Response,
        next:NextFunction
    )=>{
        try {
         const user = req.body;
         const newUser =   await userRegister(user,dbRepositoryUser,authService);
         res.json({
            message: "User registration successful,please verify email",
            newUser,
         });
        } catch (error) {
            next(error);
        }
    };

   // Verify Otp Method POSt

    const verifyOtp = async (req: Request, res: Response,next:NextFunction)=>{
        try{
            const {otp,userId} = req.body;
            const isVerified = await verifyOtpUser(otp,userId,dbRepositoryUser);
            if(isVerified){
                return res.status(HttpStatus.OK)
                .json({message:"User account verified, please login"});
            }
        }catch(error){
            next(error);
        }
    };

    //Resend Otp method : POST

    const resendOtp = async (req:Request,res:Response,next:NextFunction)=>{
        try{
            const {userId} = req.body;
            await deleteOtp(userId,dbRepositoryUser,authService);
            res.json({message:"New otp sent to mail"});
        }catch(error){
            next(error);
        }
    };


    // user login method: Post

    const userLogin = asynchandler(
        async (req: Request, res: Response, next: NextFunction) => {
          try {
            const { accessToken, isEmailExist } = await login(
              req.body,
              dbRepositoryUser,
              authService
            );
            
            // setting access token in the cookie
            res.cookie("access_token", accessToken, {
              httpOnly: true,
            });
            
            res
              .status(HttpStatus.OK)
              .json({ message: "login success", user: isEmailExist });
          } catch (error) {
            next(error);
          }
        }
      ); 
    

      // forgot password method post

      const forgotPassword = async (
        req:Request,
        res:Response,
        next:NextFunction
      )=>{
        try {
        const {email} = req.body;
        console.log(email);
        await sendResetVerificationCode(email,dbRepositoryUser,authService);
        return res.status(HttpStatus.OK).json({
            success :true,
            message:"Reset password code sent to your mail",
        });
      }catch(error){
        next(error)
      }
    }


    /** METHOD:POST reset password*/

  const resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { password } = req.body;
      const { token } = req.params;
      await verifyTokenAndRestPassword(
        token,
        password,
        dbRepositoryUser,
        authService
      );
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Reset password success,you can login with your new password",
      });
    } catch (error) {
      next(error);
    }
  };


   /**
   * * METHOD :GET
   * * Retrieve  user profile
   */
   const userProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user;
      console.log(userId)
      const user  = await getUserProfile(
        userId,
        dbRepositoryUser
      );
      
      res.status(200).json({ success: true, user});
    } catch (error) {
      next(error);
    }
  };
  /**
   * * METHOD :PATCH
   * * update user profile
   */
  const updateUserInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user;
      const updateData = req.body;
      console.log(req.body);
      const user = await updateUser(userId, updateData, dbRepositoryUser);
      res
        .status(200)
        .json({ success: true, user, message: "Profile updated successfully" });
    } catch (error) {
      next(error);
    }
  };

    return {
        registerUser,
        verifyOtp,
        userLogin,
        resendOtp,
        forgotPassword,
        resetPassword,
        updateUserInfo,
        userProfile,
    };
    };

    export default userController;


