import { DoctorInterface } from "../../../types/doctorInterface";
import sentMail from "../../../utils/sendMail";
import { doctorDbRepository} from "../../interfaces/doctorDBRepository";
import { userDbInterface } from "../../interfaces/userDbRepository";

export const blockUser = async (
    id: string,
    userDbRepository: ReturnType<userDbInterface>
  ) => {
    const user = await userDbRepository.getUserbyId(id);
  
    await userDbRepository.updateUserBlock(id, !user?.isBlocked); //update user block status
    return;
  };