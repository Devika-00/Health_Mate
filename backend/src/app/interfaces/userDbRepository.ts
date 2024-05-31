import { userEntityType ,googleSignInUserEntityType} from "../../entities/userEntity";
import { userRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/userRepositoryMongodb";



export const userDbRepository = (
    repository : ReturnType<userRepositoryMongodbType>
)=>{
    const getUserbyEmail = async (email: string)=>await repository.getUserbyEmail(email);
    

    const getUserbyId = async (id: string)=> await repository.getUserbyId(id);    

    const updateUserBlock = async (id: string, status: boolean) =>{
        await repository.updateUserBlock(id, status);
    }
    
    
    const addUser = async (user:userEntityType)=> await repository.addUser(user);

    const addOTP = async (otp: string, id:string) => await repository.AddOTP(otp,id);

    const findOtpUser = async (userId:string)=>await repository.findOtpUser(userId);

    const deleteOtpUser = async (userId: string) =>await repository.deleteOtpUser(userId);
       
    const updateProfile = async (userID:string, userData : Record<string,any>)=>await repository.updateUserInfo(userID,userData);

    const updateVerificationCode = async (email:string, verificationCode: string)=> await repository.updateVerificationCode(email,verificationCode);
    
    const verifyAndResetPassword = async (verificationCode: string,password: string) =>await repository.findVerificationCodeAndUpdate(verificationCode, password);

    const getAllUsers = async () => await repository.getAllUsers();

    const getWallet = async (userId:string) =>await repository.getWalletUser(userId);
    
    const registerGoogleSignedUser = async (user: googleSignInUserEntityType) =>await repository.registerGoogleSignedUser(user);

    const addWallet = async (userID: string) =>
        await repository.addWallet(userID);
    
    const getTransactions = async (userId:any) =>{
       const response = await repository.getAllTransaction(userId);
       return response;
    }

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
        getAllUsers,
        registerGoogleSignedUser,
        updateUserBlock,
        addWallet,
        getWallet,
        getTransactions,

    };
};

export type userDbInterface = typeof userDbRepository