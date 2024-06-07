import DoctorEntity,{doctorEntityType,googleSignInUserEntity,googleSignInUserEntityType} from "../../../entities/doctorEntity";
import { HttpStatus } from "../../../types/httpStatus";
import { CreateDoctorInterface } from "../../../types/doctorInterface";
import CustomError from "../../../utils/customError";
import sentMail from "../../../utils/sendMail";
import { doctorDbInterface } from "../../interfaces/doctorDBRepository";
import { AuthServiceInterfaceType } from "../../service-interface/authServiceInterface";
import {doctorVerifyEmailPage} from "../../../utils/doctorVerifyEmailPage";
import { GoogleResponseDoctorType } from "../../../types/googleResponseType";
import { userDbInterface } from "../../interfaces/userDbRepository";

//register new doctor       

export const addNewDoctor = async(
    doctorData: CreateDoctorInterface,
    doctorRepository:ReturnType<doctorDbInterface>,
    authService:ReturnType<AuthServiceInterfaceType>
)=>{
    const { doctorName, email, password,phoneNumber,department,consultationType,education,description,experience,lisenceCertificate,rejectedReason } = doctorData;
  const isEmailExist = await doctorRepository.getDoctorByemail(email);
  if (isEmailExist)
    throw new CustomError("Email already exists", HttpStatus.BAD_REQUEST);

  const hashedPassword: string = await authService.encryptPassword(password);
  const verificationToken = authService.getRandomString(); 
  const doctor: doctorEntityType = DoctorEntity(
    doctorName,
    email,
    hashedPassword,
    verificationToken,
    phoneNumber,
    department,
    consultationType,
    education,
    description,
    experience,
    rejectedReason,
    lisenceCertificate,

  );
  const createdDoctor = await doctorRepository.addDoctor(
    doctor
  );
  //   sent verification mail to restaurant email address
  if (createdDoctor) {
    const emailSubject = "Doctor verification ";
    sentMail(
      email,
      emailSubject,
      doctorVerifyEmailPage(doctorName, verificationToken)
    );
  }
  return createdDoctor;
};

// verify doctor 

export const verifyAccount = async (
    token: string,
    doctorRepository: ReturnType<doctorDbInterface>
  ) => {
    const updateVerification = await doctorRepository.verifyDoctor(token);
    if (!updateVerification)
      throw new CustomError("Invalid token", HttpStatus.BAD_REQUEST);
    return updateVerification;
  };


  export const doctorLogin = async (
    email: string,
    password: string,
    doctorRepository: ReturnType<doctorDbInterface>,
    authService: ReturnType<AuthServiceInterfaceType>
  ) => {
    const isEmailExist = await doctorRepository.getDoctorByemail(email);
    if (!isEmailExist)
      throw new CustomError("Invalid credentials", HttpStatus.UNAUTHORIZED);
  
    if(isEmailExist?.isBlocked){
      throw new CustomError("Account is Blocked ",HttpStatus.FORBIDDEN);
  }

    if (!isEmailExist.isVerified)
      throw new CustomError("Please verify your email", HttpStatus.UNAUTHORIZED);
  
    const message =
      "Your account has not been approved by the admin yet. Please wait for approval.";
  
    const isPasswordMatch = await authService.comparePassword(
      password,
      isEmailExist.password
    );
    if (!isPasswordMatch)
      throw new CustomError("Invalid credentials", HttpStatus.BAD_REQUEST);
    const  accessToken  = authService.doctorCreateTokens(
      isEmailExist.id,
      isEmailExist.doctorName,
      isEmailExist.role
    );
    return { accessToken, isEmailExist };
  };

  export const authenticateGoogleSignInUser = async (
    doctorData: GoogleResponseDoctorType,
    doctorDbRepository: ReturnType<doctorDbInterface>,
    authService: ReturnType<AuthServiceInterfaceType>
  ) => {
    const { name, email, picture, email_verified } = doctorData;

   
  
    const isEmailExist = await doctorDbRepository.getDoctorByemail(email);
    if (isEmailExist?.isBlocked)
      throw new CustomError(
        "Your account is blocked by administrator",
        HttpStatus.FORBIDDEN
      );

      
  
    if (isEmailExist) {
      const  accessToken  = authService.createTokens(
        isEmailExist.id,
        isEmailExist.doctorName,
        isEmailExist.role
      );
  
      return { accessToken,isEmailExist };
    } else {
      const googleSignInUser: googleSignInUserEntityType = googleSignInUserEntity(
        name,
        email,
        picture,
        email_verified,
      );
  
      const createdUser = await doctorDbRepository.registerGoogleSignedDoctor(
        googleSignInUser
      );
      const userId = createdUser._id as unknown as string;
  
      const  accessToken  = authService.createTokens(
        userId,
        createdUser.doctorName,
        createdUser.role
      );
      return { accessToken, createdUser };
    }
  };
  

  export const getDoctorProfile = async(
    doctorId : string,
    doctorRepository:ReturnType<doctorDbInterface>
  )=>{
    const doctor = await doctorRepository.getDoctorById(doctorId);
    return doctor;
  }

  export const getDoctorById = async (
    id: string,
    doctorRepository: ReturnType<doctorDbInterface>
  ) => await doctorRepository.getDoctorById(id);
