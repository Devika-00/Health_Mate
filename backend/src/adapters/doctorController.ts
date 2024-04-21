import {Request,Response,NextFunction} from "express";
import asynchandler from "express-async-handler";
import { AuthServiceInterfaceType, authServiceInterface } from "../app/service-interface/authServiceInterface";
import { AuthService } from "../frameworks/services/authService";
import { HttpStatus } from "../types/httpStatus";
import { GoogleResponseDoctorType } from "../types/googleResponseType";
import { doctorDbInterface } from "../app/interfaces/doctorDBRepository";
import { TimeSlotDbInterface } from "../app/interfaces/timeSlotDbRepository";
import { TimeSlotRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/timeSlotRepositotyMongodb";
import { doctorRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/doctorRepositoryMongodb";
import {
    addNewDoctor,
    verifyAccount,
    doctorLogin,
    authenticateGoogleSignInUser,
} from "../app/use-cases/doctor/authDoctor"
import { addTimeSlot, deleteTimeSlot, getTimeSlotsByDoctorId, } from "../app/use-cases/doctor/timeslot";

import {getDoctorProfile,
  updateDoctor} from "../app/use-cases/doctor/read & Update/profile";
const doctorController = (
    authServiceInterface:AuthServiceInterfaceType,
    authServiceImpl : AuthService,
    doctorDbRepository :doctorDbInterface,
    doctorDbRepositoryImpl:doctorRepositoryMongodbType,
    timeSlotDbRepository: TimeSlotDbInterface,
    timeSlotDbRepositoryImpl: TimeSlotRepositoryMongodbType,
) => {
    const authService = authServiceInterface(authServiceImpl());
    const dbRepositoryDoctor = doctorDbRepository(doctorDbRepositoryImpl());
    const dbTimeSlotRepository = timeSlotDbRepository(timeSlotDbRepositoryImpl());

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
      
          // Assuming doctorLogin, dbRepositoryDoctor, and authService are defined elsewhere
          const { accessToken, isEmailExist } = await doctorLogin(
            email,
            password,
            dbRepositoryDoctor,
            authService
          );
      
          return res.status(HttpStatus.OK).json({
            success: true,
            message: "Login successful",
            doctor: isEmailExist,
            accessToken: accessToken,
          });
        } catch (error) {
          next(error);
        }
      };
      
        
      const googleSignIn = async (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        try {

          // const { access_token: access, refresh_token: refresh } = req.cookies;
          // if (access || refresh) {
          //   res.clearCookie("access_token");
          //   res.clearCookie("refresh_token");
          // }
          const doctorData: GoogleResponseDoctorType = req.body.doctor;

          const { accessToken, isEmailExist, createdUser } =
            await authenticateGoogleSignInUser(
              doctorData,
              dbRepositoryDoctor,
              authService
            );
          // res.cookie("access_token", accessToken, {
          //   httpOnly: true,
          //   secure: true,
          // });
          const user = isEmailExist ? isEmailExist : createdUser;
          res.status(HttpStatus.OK).json({ message: "login success", user , accessToken: accessToken,});
        } catch (error) {
          next(error);
        }
      };


    /**method get retrieve doctor profile */
    const doctorProfile = async(
      req:Request,
      res:Response,
      next:NextFunction
    )=>{
      try{
        const doctorId = req.doctor;
        const doctor = await getDoctorProfile(
          doctorId,
          dbRepositoryDoctor
        );
        res.status(200).json({success:true,doctor});

      }catch(error){
        next(error);
      }

    };

    /**
   * * METHOD :PATCH
   * * update doctor profile
   */
  const updateDoctorInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const doctorId = req.doctor;
      const updateData = req.body;
      const doctor = await updateDoctor(doctorId, updateData, dbRepositoryDoctor);
      res
        .status(200)
        .json({ success: true, doctor, message: "Profile updated successfully" });
    } catch (error) {
      next(error);
    }
  };

  /**method get retrieve doctor status */
  const doctorStatus = async(
    req:Request,
    res:Response,
    next:NextFunction
  )=>{
    try{
      const doctorId = req.doctor;
      const doctor = await getDoctorProfile(
        doctorId,
        dbRepositoryDoctor
      );
      res.status(200).json({success:true,doctor});
    }catch(error){
      next(error);
    }
  };


  const scheduleTime = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const doctorId = req.doctor;
      const time = req.body;
      const newTimeSlot = await addTimeSlot(
        doctorId,
        time,
        dbTimeSlotRepository,
      );
  
      res.status(HttpStatus.OK).json({
        success: true,
        message: "Time slot added successfully",
        newTimeSlot,
      });
    } catch (error) {
      next(error);
    }
  };

  /*
   * * METHOD :GET
   * return all time slot to the restaurant
   */
  const getTimeSlots = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const doctorId = req.doctor;
      const timeSlots = await getTimeSlotsByDoctorId(
        doctorId,
        dbTimeSlotRepository
      );
      res.status(HttpStatus.OK).json({ success: true, timeSlots });
    } catch (error) {
      next(error);
    }
  };

  const removeTimeSlot = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      
      const{ id } = req.params;
      console.log(id);
      await deleteTimeSlot(id, dbTimeSlotRepository);
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Slot deleted successfully" });
    } catch (error) {
      next(error);
    }
  };


    return {
        signup,
        verifyToken,
        login,
        doctorProfile,
        updateDoctorInfo,
        googleSignIn,
        doctorStatus,
        scheduleTime,
        getTimeSlots,
        removeTimeSlot,
        
    }
}




export default doctorController;