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
import { PrescriptionDbInterface } from "../app/interfaces/prescriptionDbRepository";
import { PrescriptionRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/prescriptionRepositoryMongodb";
import {
    addNewDoctor,
    verifyAccount,
    doctorLogin,
    authenticateGoogleSignInUser,
} from "../app/use-cases/doctor/authDoctor"
import { addTimeSlot, deleteTimeSlot, getTimeSlotsByDoctorId, } from "../app/use-cases/doctor/timeslot";
import { BookingDbRepositoryInterface} from "../app/interfaces/bookingDbRepository";
import { BookingRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/BookingRepositoryMongodb";
import { IDepartmentRepository } from "../app/interfaces/departmentDbRepository";

import {getDoctorProfile,
  DoctorRejected,
  updateDoctor} from "../app/use-cases/doctor/read & Update/profile";
import { getPatientFullDetails, getPatients } from "../app/use-cases/doctor/doctorRead";
import { userDbInterface } from "../app/interfaces/userDbRepository";
import { userRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/userRepositoryMongodb";
import { getSingleUser } from "../app/use-cases/Admin/adminRead";
import { addPrescriptionToUser, deletePrescriptionData, fetchPrescriptionForDoctor, fetchPrescriptionUsecase } from "../app/use-cases/Prescription/prescriptionUseCase";
import { Department } from "../app/use-cases/Admin/adminDepartment";
const doctorController = (
    authServiceInterface:AuthServiceInterfaceType,
    authServiceImpl : AuthService,
    userDbRepository: userDbInterface,
    userRepositoryImpl: userRepositoryMongodbType,
    doctorDbRepository :doctorDbInterface,
    doctorDbRepositoryImpl:doctorRepositoryMongodbType,
    timeSlotDbRepository: TimeSlotDbInterface,
    timeSlotDbRepositoryImpl: TimeSlotRepositoryMongodbType,
    prescriptionDbRepository:PrescriptionDbInterface,
    prescriptionDbRepositoryImpl:PrescriptionRepositoryMongodbType,
    bookingDbRepository: BookingDbRepositoryInterface,
    bookingDbRepositoryImpl: BookingRepositoryMongodbType,
    departmentDbRepository: IDepartmentRepository,
    departmentDbRepositoryImpl: () => any
) => {
    const authService = authServiceInterface(authServiceImpl());
    const dbRepositoryUser = userDbRepository(userRepositoryImpl());
    const dbRepositoryDoctor = doctorDbRepository(doctorDbRepositoryImpl());
    const dbPrescriptionRepository = prescriptionDbRepository(prescriptionDbRepositoryImpl());
    const dbTimeSlotRepository = timeSlotDbRepository(timeSlotDbRepositoryImpl());
    const dbBookingRepository = bookingDbRepository(bookingDbRepositoryImpl());
    const dbDepartmentRepository = departmentDbRepository(departmentDbRepositoryImpl());
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

          const doctorData: GoogleResponseDoctorType = req.body.doctor;

          const { accessToken, isEmailExist, createdUser } =
            await authenticateGoogleSignInUser(
              doctorData,
              dbRepositoryDoctor,
              authService
            );
          const user = isEmailExist ? isEmailExist : createdUser;
          res.status(HttpStatus.OK).json({ message: "login success", user , accessToken: accessToken,});
        } catch (error) {
          next(error);
        }
      };


      /* method get doctor details */
    const userDetails = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        
        const {id} = req.params;
        const user = await getSingleUser(id,dbRepositoryUser);
        return res.status(HttpStatus.OK).json({ success: true, user });
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


  

  /*
   * * METHOD :GET
   * return all time slot to the doctor
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


    
    const getPatientList = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const patients = await getPatients(dbBookingRepository);
        return res.status(HttpStatus.OK).json({ success: true, patients });
      } catch (error) {
        next(error);
      }
    }

    const getPatientDetails = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const {id} = req.params;
        const patient = await getPatientFullDetails(id,dbBookingRepository);
        return res.status(HttpStatus.OK).json({ success: true, patient });
      } catch (error) {
        next(error);
      }
    }

    /**method get doctor details */
    const getDoctorDetails = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const {id} = req.params;
        const doctor = await getDoctorProfile(id,dbRepositoryDoctor);
        return res.status(HttpStatus.OK).json({ success: true, doctor });
      } catch (error) {
        next(error);
      }
    }

    /*method put doctor rejected */
    const getDoctorRejected = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const {id} = req.params;
        const doctor = await DoctorRejected(id,dbRepositoryDoctor);
        return res.status(HttpStatus.OK).json({ success: true, doctor });
      } catch (error) {
        next(error);
      }
    }


  /* add slot Method post*/ 
   
  const addSlot = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { doctorId, startDate, endDate, slotTime } = req.body;
      const data = { doctorId, startDate, endDate, slotTime };
      const response = await addTimeSlot(
        data,
        dbTimeSlotRepository
      );
  console.log(response,"ooooooooo")

      res.status(HttpStatus.OK).json({
        success: true,
        message: "slots added successfully",
        response, 
      });
    } catch (error) {
      next(error);
    }
  };

  /* Method Delete - slot delete*/
  const deleteSlot = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      
      const{ id } = req.params;
      await deleteTimeSlot(id, dbTimeSlotRepository);
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Slot deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  /* method post - add prescription */
  const addPrescription = async (
    req:Request,
    res:Response,
    next:NextFunction
  )=>{
    try {
      const {appointmentId,prescriptionDate, medicines }=req.body
      const data={appointmentId,prescriptionDate,medicines}
      const response = await addPrescriptionToUser(
        data,
        dbPrescriptionRepository
      );
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "add Prescription successfully",response });
    } catch (error) {
      next(error);
    }
  }

  /**get Method fetch Prescription */
const fetchPrescription = async(
  req:Request,
  res:Response,
  next:NextFunction
)=>{
  try {
    const { id } = req.params;
    const data =  id 
    const response = await fetchPrescriptionForDoctor(data,dbPrescriptionRepository);
    res.status(HttpStatus.OK).json({sucess:true,response});
  } catch (error) {
    next(error)
  }
}


/**method delete - delete prescription */
const deletePrescription = async (
  req:Request,
  res:Response,
  next:NextFunction,
)=>{
  try {
    const prescriptionId = req.params.id;
    const response = await deletePrescriptionData(prescriptionId,dbPrescriptionRepository);
    res.status(HttpStatus.OK).json({sucess:true,response});
  } catch (error) {
    next(error);
  }
}


/**method get receiver details */
const receiverDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
 
    const {id} = req.params;

    const doctor = await getDoctorProfile(id,dbRepositoryDoctor);
    return res.status(HttpStatus.OK).json({ success: true, doctor });
  } catch (error) {
    next(error);
  }
}
  
/**method get - fetch departments */
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
  



    return {
        signup,
        verifyToken,
        login,
        doctorProfile,
        updateDoctorInfo,
        googleSignIn,
        doctorStatus,
        getTimeSlots,
        // removeTimeSlot,
        getPatientList,
        getPatientDetails,
        getDoctorDetails,
        getDoctorRejected,
        addSlot,
        deleteSlot,
        userDetails,
        addPrescription,
        fetchPrescription,
        deletePrescription,
        receiverDetails,
        getAllDepartments,
    }
}




export default doctorController;