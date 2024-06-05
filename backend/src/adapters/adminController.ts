import { NextFunction, Request, Response } from "express";
import { AuthService } from "../frameworks/services/authService";
import { HttpStatus } from "../types/httpStatus";
import {loginAdmin} from "../app/use-cases/Admin/adminAuth";
import {getUsers,
  getDoctors,
  getSingleDoctor,
  getDoctor,
  getDoctorRejected,
  getAllDoctors,
  getAllTheAppoinments,
} from "../app/use-cases/Admin/adminRead";
import { AuthServiceInterfaceType } from "../app/service-interface/authServiceInterface";
import { userDbInterface } from "../app/interfaces/userDbRepository";
import { userRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/userRepositoryMongodb";
import { doctorDbInterface } from "../app/interfaces/doctorDBRepository";
import { doctorRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/doctorRepositoryMongodb";
import { blockUser,blockDoctor } from "../app/use-cases/Admin/adminUpdate";
import doctor from "../frameworks/database/mongodb/models/doctor";
import { Department, addOneDepartment, departmentUnlist, departmentUpdate } from "../app/use-cases/Admin/adminDepartment";
import { IDepartmentRepository } from "../app/interfaces/departmentDbRepository";


// adminAuthController
export default (
    authServiceInterface: AuthServiceInterfaceType,
    authServiceImpl: AuthService,
    userDbRepository: userDbInterface,
    userDbRepositoryImpl: userRepositoryMongodbType,
    doctorDbRepository: doctorDbInterface,
    doctorDbRepositoryImpl: doctorRepositoryMongodbType,
    departmentDbRepository: IDepartmentRepository,
    departmentDbRepositoryImpl: () => any
    
  ) => {
    const dbUserRepository = userDbRepository(userDbRepositoryImpl());
    const dbDoctorRepository = doctorDbRepository(doctorDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    const dbDepartmentRepository = departmentDbRepository(departmentDbRepositoryImpl());
   


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
        return res.status(HttpStatus.OK).json({
            success: true,
            message: "Admin login success",
            accessToken:accessToken,
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
const getAllTheDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctors = await getAllDoctors(dbDoctorRepository);
    return res.status(HttpStatus.OK).json({ success: true, doctors });
  } catch (error) {
    next(error);
  }
};

/**method get fetch all appoinments */

const getAllAppoinments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const appoinments = await getAllTheAppoinments(dbDoctorRepository);
    return res.status(HttpStatus.OK).json({ success: true, appoinments });
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
      const updatedUser = await blockUser(id, dbUserRepository);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "User block status updated successfully",
        user:updatedUser,
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
      const updatedDoctor =await blockDoctor(id, dbDoctorRepository);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "doctor block status updated successfully",
        doctor: updatedDoctor 
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


  /* method patch verify in admin */
  const VerifyDoctor = async(
    req:Request,
    res:Response,
    next:NextFunction
  )=>{
    try {
      const {id} = req.params;
      const {status} = req.body;
      const doctor = await getDoctor(id,status,dbDoctorRepository);
      return res.status(HttpStatus.OK).json({ success: true, doctor,message:"Verified Successfully" });
    } catch (error) {
      next(error);
    }
  }


  /* method patch rejection in admin */
  const rejectionDoctor = async(
    req:Request,
    res:Response,
    next:NextFunction
  )=>{
    try {
      const {id} = req.params;
      const {status} = req.body;
      const {reason} = req.body;
      const doctor = await getDoctorRejected(id,status,reason,dbDoctorRepository);
      return res.status(HttpStatus.OK).json({ success: true, doctor,message:"Verified Successfully" });
    } catch (error) {
      next(error);
    }
  }

  /**method post - Add Department */
  
  const addDepartment = async(
    req:Request,
    res:Response,
    next:NextFunction
  )=>{
    try {
      const { departmentName, isListed } = req.body;

      const department = await addOneDepartment(departmentName,isListed,dbDepartmentRepository);
      return res.status(HttpStatus.OK).json({ success: true, department,message:"Department added Successfully" });
    } catch (error) {
      next(error);
    }
  }

  /**method get -  Department */
  
  const getAllDepartments = async(
    req:Request,
    res:Response,
    next:NextFunction
  )=>{
    try {
      const allDepartment = await Department(dbDepartmentRepository);
      return res.status(HttpStatus.OK).json({ success: true, allDepartment,message:"Department added Successfully" });
    } catch (error) {
      next(error);

    }
  }


  /**method put - edit department */
  const updateDepartment = async(
    req:Request,
    res:Response,
    next:NextFunction
  )=>{
    try {
     const {departmentName} = req.body;
     const {id} = req.params;
    
     const update = await departmentUpdate(departmentName,id,dbDepartmentRepository);
     return res.status(HttpStatus.OK).json({success:true,update,message:"update Successfully"});
    
    } catch (error) {
      next(error);
    }
  }

  /*
   * METHOD:PATCH
   * Block or Unblock user
   */
  const unlistDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedDepartment = await departmentUnlist(id, dbDepartmentRepository);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "updated successfully",
        department:updatedDepartment,
      });
    } catch (error) {
      next(error);
    }
  };




        return {
            adminLogin,
            getAllUser,
            userBlock,
            getAllTheDoctors,
            doctorBlock,
            doctorDetails,
            VerifyDoctor,
            rejectionDoctor,
            getAllAppoinments,
            addDepartment,
            getAllDepartments,
            updateDepartment,
            unlistDepartment,
          }

}  
