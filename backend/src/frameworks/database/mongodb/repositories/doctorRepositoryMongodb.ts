import { doctorEntityType } from "../../../../entities/doctorEntity";
import { DoctorInterface } from "../../../../types/doctorInterface";
import Doctor from "../models/doctor";

export const doctorRepositoryMongodb = () =>{
    const getDoctorById = async (id: string) =>
    await Doctor.findById(id).select(
      "-password -isVerified -isApproved -isRejected -verificationToken"
    );

  const getDoctorByemail = async (email: string) => {
    const doctor: DoctorInterface | null = await Doctor.findOne({
      email,
    });
    return doctor;
  };
  const addDoctor = async (doctorData: doctorEntityType) => {
    const newDoctor = new Doctor({
      doctorName: doctorData.getDoctorName(),
      email: doctorData.getEmail(),
      password: doctorData.getPassword(),
      verificationToken: doctorData.getVerificationToken(),
    });
    return await newDoctor.save();
  };

  const verifyDoctor = async (token: string) =>
    await Doctor.findOneAndUpdate(
      { verificationToken: token },
      { isVerified: true, verificationToken: null }
    );

    const updateDoctorInfo = async (id: string, updateData:Record<string,any>)=>await Doctor.findByIdAndUpdate(id,updateData,{new:true});  

  return {
    getDoctorById,
    getDoctorByemail,
    addDoctor,
    verifyDoctor,
    updateDoctorInfo,
  }

}

export type doctorRepositoryMongodbType =
  typeof doctorRepositoryMongodb;