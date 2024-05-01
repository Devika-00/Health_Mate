import { Types } from "mongoose";
import { doctorDbInterface } from "../../../interfaces/doctorDBRepository";
import { DoctorInterface } from "../../../../types/doctorInterface";

export const getDoctorProfile = async (
  doctorID: string,
  DoctorRepository: ReturnType<doctorDbInterface>
) => {
  const doctor = await DoctorRepository.getDoctorById(doctorID);
  return doctor ;
};

export const   updateDoctor = async (
  doctorID: string,
  updateData: DoctorInterface,
  doctorRepository: ReturnType<doctorDbInterface>
) => await doctorRepository.updateProfile(doctorID, updateData);


export const DoctorRejected = async (
  doctorID: string,
  DoctorRepository: ReturnType<doctorDbInterface>
) => {
  const doctor = await DoctorRepository.getRejectedDoctorById(doctorID);
  return doctor ;
};