import { doctorEntityType, googleSignInUserEntityType } from "../../../../entities/doctorEntity";
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
      phoneNumber:doctorData.getPhoneNumber(),
      department:doctorData.getDepartment(),
      education:doctorData.getEducation(),
      description:doctorData.getDescription(),
      experience:doctorData.getExperience(),
      rejectedReason:doctorData.getRejectedReason(),
      lisenceCertificate:doctorData.getLisenceCertificate(),
    });
    return await newDoctor.save();
  };

  const getDoctorByIdUpdate = async (id: string,status:string) =>await Doctor.findByIdAndUpdate(id,{status:status, isApproved:true}).select("-password -isVerified -isApproved -isRejected -verificationToken");

  const getDoctorByIdUpdateRejected = async (id: string,status:string,reason:string) =>await Doctor.findByIdAndUpdate(id,{status:status, isApproved:false, rejectedReason:reason}).select("-password -isVerified -isApproved -isRejected -verificationToken");

  const updateDoctorBlock = async (id: string, status: boolean) => {
    await Doctor.findByIdAndUpdate(id, { isBlocked: status });
  }
  

  const verifyDoctor = async (token: string) =>
    await Doctor.findOneAndUpdate(
      { verificationToken: token },
      { isVerified: true, verificationToken: null }
    );

    const updateDoctorInfo = async (id: string, updateData:Record<string,any>)=>await Doctor.findByIdAndUpdate(id,updateData,{new:true});  

    const getAllDoctors = async () => await Doctor.find({ isVerified: true }); 

    const registerGoogleSignedDoctor = async (doctor: googleSignInUserEntityType) =>
      await Doctor.create({
        doctorName: doctor.doctorName(),
        email: doctor.email(),
        profileImage: doctor.picture(),
        isVerified: doctor.email_verified(),
        
      });
    
    const getRejectedDoctorById = async (id: string) =>
        await Doctor.findByIdAndUpdate(id,{status:"pending"}).select(
          "-password -isVerified -isApproved -isRejected -verificationToken"
    ); 

  return {
    getDoctorById,
    getDoctorByemail,
    addDoctor,
    verifyDoctor,
    updateDoctorInfo,
    registerGoogleSignedDoctor,
    getAllDoctors,
    updateDoctorBlock,
    getDoctorByIdUpdateRejected,
    getDoctorByIdUpdate,
    getRejectedDoctorById,


  }

}

export type doctorRepositoryMongodbType =
  typeof doctorRepositoryMongodb;