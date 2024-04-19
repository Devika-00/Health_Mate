import { DoctorInterface } from "../../../types/doctorInterface";
import sentMail from "../../../utils/sendMail";
import { doctorDbRepository} from "../../interfaces/doctorDBRepository";
import { userDbInterface } from "../../interfaces/userDbRepository";
import { doctorDbInterface } from "../../interfaces/doctorDBRepository";

export const blockUser = async (
    id: string,
    userDbRepository: ReturnType<userDbInterface>
  ) => {
    const user = await userDbRepository.getUserbyId(id);
  
    await userDbRepository.updateUserBlock(id, !user?.isBlocked); //update user block status
    return;
  };

  export const blockDoctor = async (
    id: string,
    doctorDbRepository: ReturnType<doctorDbInterface>
  ) => {
    const doctor = await doctorDbRepository.getDoctorById(id);
  
    await doctorDbRepository.updateDoctorBlock(id, !doctor?.isBlocked); //update user block status
    return;
  };