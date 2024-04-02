import createUserEntity, {userEntityType} from "../../../../entities/userEntity";
import { CreateUserInterface,UserInterface } from "../../../../types/userInterface";
import { userDbInterface } from "../../../interfaces/userDbRepository";
import {AuthServiceInterfaceType } from "../../../service-interface/authServiceInterface";
import CustomError from "../../../../utils/customError";
import { HttpStatus } from "../../../../types/httpStatus";
import sentMail from "../../../../utils/sendMail";
import { otpEmail } from "../../../../utils/userEmail";
import mongoose from "mongoose";


export const userRegister = async (
    user:CreateUserInterface,
    userRepository:ReturnType<userDbInterface>,
    authService:ReturnType<AuthServiceInterfaceType>
)=>{
    const {name,email,password} = user;

    //Check the email is already exist

    const isEmailExist = await userRepository.getUserbyEmail(email);
    if(isEmailExist)
    throw new CustomError("Email already exists",HttpStatus.BAD_REQUEST);

    const hashedPassword: string = await authService.encryptPassword(password);

    const userEntity: userEntityType = createUserEntity(
        name,
        email,
        hashedPassword
    );

    //create a new User 
    const createdUser: UserInterface = await userRepository.addUser(userEntity);
    
    const OTP = authService.generateOTP();  //generate otp
    const emailSubject = "Account verification";
    await userRepository.addOTP(OTP, createdUser.id);
    sentMail(createdUser.email,emailSubject,otpEmail(OTP, createdUser.name)); //send otp

    return createdUser;

};

//verify otp with db otp 

export const verifyOtpUser = async (
    userOTP: string,
    userId: string,
    userRepository:ReturnType<userDbInterface>
)=>{
    if(!userOTP)
    throw new CustomError("Please provide an OTP",HttpStatus.BAD_REQUEST);

    const otpUser = await userRepository.findOtpUser(userId);
    if (!otpUser)
    throw new CustomError(
      "Invalid otp , try resending the otp",
      HttpStatus.BAD_REQUEST
    );

  if (otpUser.OTP === userOTP) {
    await userRepository.updateProfile(userId, {
      isVerified: true,
    });
    return true;
  } else {
    throw new CustomError("Invalid OTP,try again", HttpStatus.BAD_REQUEST);
  }
};

export const deleteOtp = async (
    userId: string,
    userDbRepository: ReturnType<userDbInterface>,
    authService: ReturnType<AuthServiceInterfaceType>
  ) => {
    const newOtp: string = authService.generateOTP();
    const deleted = await userDbRepository.deleteOtpUser(userId); // delete the existing otp user from db
    if (deleted) {
      await userDbRepository.addOTP(newOtp, userId); // create new otp user
    }
    const user = await userDbRepository.getUserbyId(userId);
    if (user) {
      const emailSubject = "Account verification , New OTP";
      sentMail(user.email, emailSubject, otpEmail(newOtp, user.name)); // Sending otp to the user email
    }
   };

export const login = async(
    user:{email: string; password:string},
    userDbRepository:ReturnType<userDbInterface>,
    authService:ReturnType<AuthServiceInterfaceType>
)=>{
    const {email,password} = user;
    const isEmailExist = await userDbRepository.getUserbyEmail(email);

    if(!isEmailExist){
        throw new CustomError("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    if(isEmailExist?.isBlocked){
        throw new CustomError("Account is Blocked ",HttpStatus.FORBIDDEN);
    }

    if(!isEmailExist?.isVerified){
        throw new CustomError("your account is not verified",HttpStatus.UNAUTHORIZED);
    }

    if(!isEmailExist.password){
        throw new CustomError("Invalid Credentials",HttpStatus.UNAUTHORIZED);
    }
    
    const isPasswordMatched = await authService.comparePassword(password,isEmailExist?.password);

    if(!isPasswordMatched){
        throw new CustomError("Invalid credentials",HttpStatus.UNAUTHORIZED);
    }

    const accessToken = authService.createTokens(
        isEmailExist.id,
        isEmailExist.name,
        isEmailExist.role
    );

    return {accessToken,isEmailExist};
}