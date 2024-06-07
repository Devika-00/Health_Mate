import { NextFunction,Request,Response } from "express";
import asynchandler from "express-async-handler";
import { 
    userRegister,
    verifyOtpUser,
    login,
    deleteOtp,
    sendResetVerificationCode,
    verifyTokenAndRestPassword,
    authenticateGoogleSignInUser,
  
} from "../app/use-cases/user/auth/userAuth";
import {WalletTransactions, getUserProfile,
        getWalletUser,
        updateUser} from "../app/use-cases/user/read & update/profile";
import { userDbInterface } from "../app/interfaces/userDbRepository";
import { GoogleResponseType } from "../types/googleResponseType";
import { userRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/userRepositoryMongodb";
import { AuthService } from "../frameworks/services/authService";
import { AuthServiceInterfaceType} from "../app/service-interface/authServiceInterface";
import { HttpStatus } from "../types/httpStatus";
import { doctorDbInterface } from "../app/interfaces/doctorDBRepository";
import { doctorRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/doctorRepositoryMongodb";
import { getDoctors, getSingleDoctor } from "../app/use-cases/Admin/adminRead";
import { TimeSlotDbInterface } from "../app/interfaces/timeSlotDbRepository";
import { TimeSlotRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/timeSlotRepositotyMongodb";
import { getTimeSlotsByDoctorId,
         getDateSlotsByDoctorId,
         getAllTimeSlotsByDoctorId,
 } from "../app/use-cases/doctor/timeslot";
 import { PrescriptionDbInterface } from "../app/interfaces/prescriptionDbRepository";
import { PrescriptionRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/prescriptionRepositoryMongodb";
import timeSlots from "../frameworks/database/mongodb/models/timeSlots";
import { getAllTimeSlot } from "../app/use-cases/user/timeslots/get and update ";
import { fetchPrescriptionUsecase, uploadLabDocuments,getDocuments, deleteSingleDocument } from "../app/use-cases/Prescription/prescriptionUseCase";
import { IDepartmentRepository } from "../app/interfaces/departmentDbRepository";
import { Department } from "../app/use-cases/Admin/adminDepartment";




const userController=(
    authServiceInterface: AuthServiceInterfaceType,
    authServiceImpl:AuthService,
    userDbRepository: userDbInterface,
    userRepositoryImpl: userRepositoryMongodbType,
    doctorDbRepository: doctorDbInterface,
    doctorDbRepositoryImpl: doctorRepositoryMongodbType,
    timeSlotDbRepository: TimeSlotDbInterface,
    timeSlotDbRepositoryImpl: TimeSlotRepositoryMongodbType,
    prescriptionDbRepository:PrescriptionDbInterface,
    prescriptionDbRepositoryImpl:PrescriptionRepositoryMongodbType,
    departmentDbRepository: IDepartmentRepository,
    departmentDbRepositoryImpl: () => any
)=>{
    const dbRepositoryUser = userDbRepository(userRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    const dbDoctorRepository = doctorDbRepository(doctorDbRepositoryImpl());
    const dbPrescriptionRepository = prescriptionDbRepository(prescriptionDbRepositoryImpl());
    const dbTimeSlotRepository = timeSlotDbRepository(timeSlotDbRepositoryImpl());
    const dbDepartmentRepository = departmentDbRepository(departmentDbRepositoryImpl());
   
    // Register User POST - Method
    
    const registerUser = async(
        req:Request,
        res:Response,
        next:NextFunction
    )=>{
        try {
         const user = req.body;
         const {createdUser, accessToken} =   await userRegister(user,dbRepositoryUser,authService);
         res.json({
            message: "User registration successful,please verify email",
            newUser: createdUser,
            accessToken: accessToken,
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
            
            res
              .status(HttpStatus.OK)
              .json({ message: "login success", user: isEmailExist ,
               accessToken: accessToken,
              });
          } catch (error) {
            next(error);
          }
        }
      ); 

       /**
   ** method : POST
   ** Google Signin with user credentials
   */

  const googleSignIn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData: GoogleResponseType = req.body.user;
      const { accessToken, isEmailExist, createdUser } =
        await authenticateGoogleSignInUser(
          userData,
          dbRepositoryUser,
          authService
        );
      const user = isEmailExist ? isEmailExist : createdUser;
      res.status(HttpStatus.OK).json({ message: "login success", user , accessToken: accessToken,});
    } catch (error) {
      next(error);
    }
  };
    

      // forgot password method post

      const forgotPassword = async (
        req:Request,
        res:Response,
        next:NextFunction
      )=>{
        try {
        const {email} = req.body;
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
   * * METHOD :GET
   * * Retrieve  user wallet
   */
const getWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params;
    
    const getWallet = await getWalletUser(id,dbRepositoryUser);
    res.status(200).json({ success: true, getWallet});
  } catch (error) {
    next(error);
  }
};

/**Method Get fetch transactions */

const getTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user;
    const transaction = await WalletTransactions(userId, dbRepositoryUser);
    res.status(200).json({
      success: true,
      transaction,
      message: "Transactions fetched successfully",
    });
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
      const user = await updateUser(userId, updateData, dbRepositoryUser);
      res
        .status(200)
        .json({ success: true, user, message: "Profile updated successfully" });
    } catch (error) {
      next(error);
    }
  };

  /*
   * METHOD:GET
   * Retrieve all the doctors from db
   */
  const doctorPage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { searchQuery, department, selectedDate, selectedTimeSlot} = req.query;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 8;
      

      const searchQueryStr = searchQuery as string | undefined;
      const departmentStr = department as string | undefined;
      const selectedDateStr = selectedDate as string | undefined;
      const selectedTimeSlotStr = selectedTimeSlot as string | undefined;
      
      
      const doctors = await getDoctors({
        searchQuery: searchQueryStr,
        department: departmentStr,
        selectedDate: selectedDateStr,
        selectedTimeSlot: selectedTimeSlotStr,
        page,
        limit,
      }, dbDoctorRepository);

      return res.status(200).json({ success: true, ...doctors });
    } catch (error) {
      next(error);
    }
  };
  


 /*
   * METHOD:GET
   * Retrieve all the doctors from db
   */
 const getAllTimeSlots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const timeslots = await getAllTimeSlot(dbTimeSlotRepository);
    return res.status(HttpStatus.OK).json({ success: true, timeslots });
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
/**get time slot by doctorId GET method*/
const getTimeslots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    const timeSlots = await getAllTimeSlotsByDoctorId(
      id,
      date,
      dbTimeSlotRepository
    );

    res.status(HttpStatus.OK).json({ success: true, timeSlots });
  } catch (error) {
    next(error);
  }
};


/**get time slot by doctorId GET method*/
const getDateSlots = async(
  req:Request,
  res:Response,
  next:NextFunction
)=>{
  try{
  const {id} = req.params;
  const dateSlots = await getDateSlotsByDoctorId(
    id,
    dbTimeSlotRepository
  )
  res.status(HttpStatus.OK).json({ success: true, dateSlots });
}catch (error) {
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
    const {appoinmentId} = req.body;
    const data = {appoinmentId}
    const response = await fetchPrescriptionUsecase(data,dbPrescriptionRepository);
    res.status(HttpStatus.OK).json({sucess:true,response});
  } catch (error) {
    next(error)
  }
}


/**post method lab record upload */
const labRecords = async(
  req:Request,
  res:Response,
  next:NextFunction
)=>{
  try {
    const {documents} = req.body;
    const {id} = req.body
    const data = documents;
    const appoinmentId = id;
    const response = await uploadLabDocuments(appoinmentId,data,dbPrescriptionRepository);
    res.status(HttpStatus.OK).json({sucess:true,response});
  } catch (error) {
    next(error);
  }
}

/**get lab records method get  */
const fetchDocuments = async(
  req:Request,
  res:Response,
  next:NextFunction
)=>{
  try {
    const {id} = req.params;
   const documents = await getDocuments(
    id,
    dbPrescriptionRepository,
  )
  res.status(HttpStatus.OK).json({success:true, documents}) 
  } catch (error) {
    next(error)
  }
}

/**delete document method delete */
const deleteDocument = async(
  req:Request,
  res:Response,
  next:NextFunction,
)=>{
  try {
    const id = req.params.id;
    const response = await deleteSingleDocument(id,dbPrescriptionRepository)
    
    res.status(HttpStatus.OK).json({success:true, response}) 
  } catch (error) {
    next(error);
  }
}

/**method get - Add Department */
  
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
        registerUser,
        verifyOtp,
        userLogin,
        resendOtp,
        forgotPassword,
        resetPassword,
        updateUserInfo,
        userProfile,
        googleSignIn,
        doctorPage,
        doctorDetails,
        getTimeslots,
        getDateSlots,
        getAllTimeSlots,
        fetchPrescription,
        labRecords,
        fetchDocuments,
        deleteDocument,
        getWallet,
        getTransactions,
        getAllDepartments,
    };
    };

    export default userController;


