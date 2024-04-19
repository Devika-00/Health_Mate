import { Request } from "express";
import { userDbInterface } from "../../interfaces/userDbRepository";
import { doctorDbInterface } from "../../interfaces/doctorDBRepository";


export const getUsers = async (userDbRepository: ReturnType<userDbInterface>) =>
  await userDbRepository.getAllUsers();

export const getDoctors = async (doctorDbRepository: ReturnType<doctorDbInterface>) =>
  await doctorDbRepository.getAllDoctors();
