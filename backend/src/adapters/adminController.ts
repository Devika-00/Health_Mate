import { NextFunction, Request, Response } from "express";
import { AuthService } from "../frameworks/services/authService";
import { HttpStatus } from "../types/httpStatus";
import {loginAdmin} from "../app/use-cases/Admin/adminAuth";
import {getUsers,
  getDoctors,
  getSingleDoctor,
  getDoctor,
} from "../app/use-cases/Admin/adminRead";
import { AuthServiceInterfaceType } from "../app/service-interface/authServiceInterface";
import { userDbInterface } from "../app/interfaces/userDbRepository";
import { userRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/userRepositoryMongodb";
import { doctorDbInterface } from "../app/interfaces/doctorDBRepository";
import { doctorRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/doctorRepositoryMongodb";
import { blockUser,blockDoctor } from "../app/use-cases/Admin/adminUpdate";

// adminAuthController
export default (
    authServiceInterface: AuthServiceInterfaceType,
    authServiceImpl: AuthService,
    userDbRepository: userDbInterface,
    userDbRepositoryImpl: userRepositoryMongodbType,
    doctorDbRepository: doctorDbInterface,
    doctorDbRepositoryImpl: doctorRepositoryMongodbType,
    
   
  ) => {
    const dbUserRepository = userDbRepository(userDbRepositoryImpl());
    const dbDoctorRepository = doctorDbRepository(doctorDbRepositoryImpl());
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

/*
   * METHOD:GET
   * Retrieve all the users from db
   */
const getAllUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users = await getUsers(dbUserRepository);
      return res.status(HttpStatus.OK).json({ success: true, users });
    } catch (error) {
      next(error);
    }
  };

/*
   * METHOD:GET
   * Retrieve all the doctors from db
   */
const getAllDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctors = await getDoctors(dbDoctorRepository);
    return res.status(HttpStatus.OK).json({ success: true, doctors });
  } catch (error) {
    next(error);
  }
};
  


  /*
   * METHOD:PATCH
   * Block or Unblock user
   */
  const userBlock = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await blockUser(id, dbUserRepository);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "User block status updated successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  /*
   * METHOD:PATCH
   * Block or Unblock user
   */
  const doctorBlock = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await blockDoctor(id, dbDoctorRepository);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "User block status updated successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  /* method get doctor details */
  const doctorDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {id} = req.params;
      const doctor = await getSingleDoctor(id,dbDoctorRepository);
      return res.status(HttpStatus.OK).json({ success: true, doctor });
    } catch (error) {
      next(error);
    }
  };


  /* method patch updateDoctor in admin */
  const updateDoctor = async(
    req:Request,
    res:Response,
    next:NextFunction
  )=>{
    try {
      const {id} = req.params;
      const {action} = req.body;
      const doctor = await getDoctor(id,action,dbDoctorRepository);
      return res.status(HttpStatus.OK).json({ success: true, doctor,message:"update Successfull" });
    } catch (error) {
      next(error);
    }
  }


        return {
            adminLogin,
            getAllUser,
            userBlock,
            getAllDoctors,
            doctorBlock,
            doctorDetails,
            updateDoctor,
          }

}  
