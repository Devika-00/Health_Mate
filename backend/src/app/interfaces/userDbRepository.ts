import { userEntityType } from "../../entities/userEntity";
import { userRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/userRepositoryMongodb";



export const userDbRepository = (
    repository : ReturnType<userRepositoryMongodbType>
)=>{
    const getUserbyEmail = async (email: string)=>await repository.getUserbyEmail(email);

    const getUserbyId = async (id: string)=> await repository.getUserbyId(id);    
    
    const addUser = async (user:userEntityType)=> await repository.addUser(user);

    const addOTP = async (otp: string, id:string) => await repository.AddOTP(otp,id);

    const findOtpUser = async (userId:string)=>await repository.findOtpUser(userId);

    const deleteOtpUser = async (userId: string) =>await repository.deleteOtpUser(userId);
       
    const updateProfile = async (userID:string, userData : Record<string,any>)=>await repository.updateUserInfo(userID,userData);

    const updateVerificationCode = async (email:string, verificationCode: string)=> await repository.updateVerificationCode(email,verificationCode);
    
    const verifyAndResetPassword = async (verificationCode: string,password: string) =>await repository.findVerificationCodeAndUpdate(verificationCode, password);

    return {
        getUserbyEmail,
        getUserbyId,
        addUser,
        addOTP,
        findOtpUser,
        updateProfile,
        deleteOtpUser,
        updateVerificationCode,
        verifyAndResetPassword,
    };
};

export type userDbInterface = typeof userDbRepository