import DoctorEntity,{doctorEntityType,} from "../../../entities/doctorEntity";
import { HttpStatus } from "../../../types/httpStatus";
import { CreateDoctorInterface } from "../../../types/doctorInterface";
import CustomError from "../../../utils/customError";
import sentMail from "../../../utils/sendMail";
import { doctorDbInterface } from "../../interfaces/doctorDBRepository";
import { AuthServiceInterfaceType } from "../../service-interface/authServiceInterface";
import {doctorVerifyEmailPage} from "../../../utils/doctorVerifyEmailPage";

//register new doctor       

export const addNewDoctor = async(
    doctorData: CreateDoctorInterface,
    doctorRepository:ReturnType<doctorDbInterface>,
    authService:ReturnType<AuthServiceInterfaceType>
)=>{
    const { doctorName, email, password } = doctorData;
  const isEmailExist = await doctorRepository.getDoctorByemail(email);
  if (isEmailExist)
    throw new CustomError("Email already exists", HttpStatus.BAD_REQUEST);

  const hashedPassword: string = await authService.encryptPassword(password);
  const verificationToken = authService.getRandomString(); // generates a random string using uuid 
  const doctor: doctorEntityType = DoctorEntity(
    doctorName,
    email,
    hashedPassword,
    verificationToken,
  );
  const createdDoctor = await doctorRepository.addDoctor(
    doctor
  );
  console.log(verificationToken, "token");
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
    const { accessToken } = authService.createTokens(
      isEmailExist.id,
      isEmailExist.doctorName,
      isEmailExist.role
    );
    return { accessToken, isEmailExist };
  };
