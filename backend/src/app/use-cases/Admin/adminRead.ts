import { Request } from "express";
import { userDbInterface } from "../../interfaces/userDbRepository";


export const getUsers = async (userDbRepository: ReturnType<userDbInterface>) =>
  await userDbRepository.getAllUsers();
