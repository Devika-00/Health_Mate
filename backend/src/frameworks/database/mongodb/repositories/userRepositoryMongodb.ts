import { userEntityType } from "../../../../entities/userEntity";
import { UserInterface } from "../../../../types/userInterface";
import OTPModel from "../models/OTPmodel";
import User from "../models/user";


export const userRepositoryMongodb = () =>{
    const getUserbyEmail = async (email: string)=>{
        const user: UserInterface | null = await User.findOne({email});
        return user;
    }

    const getUserbyId = async (id: string) => await User.findById(id);

    const addUser = async (user:userEntityType)=>{
        const newUser:any = new User({
            name:user.name(),
            email:user.getEmail(),
            password:user.getPassword(),
        });
        await newUser.save();
        return newUser;
    };

    const AddOTP = async (OTP: string, userId: string)=>{
        await OTPModel.create({OTP, userId});
    };

    const findOtpUser = async (userId:string)=>await OTPModel.findOne({userId: userId});

    const deleteOtpUser = async (userId: string) =>await OTPModel.deleteOne({ userId });


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
    };

};

export type userRepositoryMongodbType = typeof userRepositoryMongodb;
