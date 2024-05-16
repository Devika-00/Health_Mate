import { Request } from "express";
import { userDbInterface } from "../../interfaces/userDbRepository";
import { doctorDbInterface } from "../../interfaces/doctorDBRepository";
import sentMail from "../../../utils/sendMail";
import { doctorVerificationRejectedEmailPage } from "../../../utils/doctorVerificationRejectionEmail";


export const getUsers = async (userDbRepository: ReturnType<userDbInterface>) =>
  await userDbRepository.getAllUsers();

export const getDoctors = async (doctorDbRepository: ReturnType<doctorDbInterface>) =>
  await doctorDbRepository.getAllDoctors();

export const getSingleDoctor = async ( id: string, doctorDbRepository: ReturnType<doctorDbInterface>) =>
  await doctorDbRepository.getDoctorById(id);

export const getSingleUser = async ( id: string, userDbRepository: ReturnType<userDbInterface>) =>
  await userDbRepository.getUserbyId(id);

export const getDoctor = async ( id: string,status:string, doctorDbRepository: ReturnType<doctorDbInterface>) =>
  await doctorDbRepository.getDoctorByIdUpdate(id,status);


export const getDoctorRejected = async ( id: string,status:string,reason:string ,doctorDbRepository: ReturnType<doctorDbInterface>) =>{
  await doctorDbRepository.getDoctorByIdUpdateRejected(id,status,reason);
  const doctor =await doctorDbRepository.getDoctorById(id);
  if(doctor){
    const doctorName = doctor.doctorName
    const email = doctor.email
    const emailSubject = "Verification Rejected";
    sentMail(email,emailSubject,doctorVerificationRejectedEmailPage(doctorName,reason))
  }else{
    console.error ("Doctor not found");
  }
}
