import { userEntityType,googleSignInUserEntityType } from "../../../../entities/userEntity";
import { UserInterface } from "../../../../types/userInterface";
import OTPModel from "../models/OTPmodel";
import transations from "../models/transations";
import User from "../models/user";
import wallet from "../models/wallet";


export const userRepositoryMongodb = () =>{
    const getUserbyEmail = async (email: string)=>{
        const user: UserInterface | null = await User.findOne({email});
        return user;
    }

    const getUserbyId = async (id: string) => await User.findById(id);

    const updateUserBlock = async (id: string, status: boolean) =>{
        await User.findByIdAndUpdate(id, { isBlocked: status });
    }

    const addUser = async (user:userEntityType)=>{
        const newUser:any = new User({
            name:user.name(),
            email:user.getEmail(),
            password:user.getPassword(),
            authenticationMethod:user.getAuthenticationMethod(),
        });
        await newUser.save();
        return newUser;
    };

    const addWallet = async (userId: string) => await wallet.create({ userId });

    const AddOTP = async (OTP: string, userId: string)=>{
        await OTPModel.create({OTP, userId});
    };

    const findOtpUser = async (userId:string)=>await OTPModel.findOne({userId: userId});

    const deleteOtpUser = async (userId: string) =>await OTPModel.deleteOne({ userId });

    const getWalletUser = async (userId:string) => {
       const response = await wallet.findOne({userId:userId}); 
        return response;

    }

    const updateUserInfo = async (id: string, updateData:Record<string,any>)=>await User.findByIdAndUpdate(id,updateData,{new:true});

    const updateVerificationCode = async (email: string, code: string) => await User.findOneAndUpdate({ email }, { verificationCode: code });

    const findVerificationCodeAndUpdate = async (
        code: string,
        newPassword: string
      ) =>
        await User.findOneAndUpdate(
          { verificationCode: code },
          { password: newPassword, verificationCode: null },
          { upsert: true }
        );

    const getAllUsers = async () => await User.find({ isVerified: true });

    const registerGoogleSignedUser = async (user: googleSignInUserEntityType) =>
        await User.create({
          name: user.name(),
          email: user.email(),
          profilePicture: user.picture(),
          isVerified: user.email_verified(),
          authenticationMethod:user.authenticationMethod(),
        });

    const getAllTransaction = async (userId:any) =>{
        const transactions = await transations.find({userId:userId});
        return transactions;
    }    
    
    return {
        getUserbyEmail,
        getUserbyId,
        addUser,
        AddOTP,
        findOtpUser,
        updateUserInfo,
        deleteOtpUser,
        updateVerificationCode,
        findVerificationCodeAndUpdate,
        getAllUsers,
        registerGoogleSignedUser,
        updateUserBlock,
        addWallet,
        getWalletUser,
        getAllTransaction,

    };

};

export type userRepositoryMongodbType = typeof userRepositoryMongodb;
