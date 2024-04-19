import { doctorEntityType, googleSignInUserEntityType } from "../../entities/doctorEntity";
import { doctorRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/doctorRepositoryMongodb";
import { DoctorInterface } from "../../types/doctorInterface";

export const doctorDbRepository = (
    repository:ReturnType<doctorRepositoryMongodbType>
)=>{
    const getDoctorById = async (id: string) =>await repository.getDoctorById(id);

    const getDoctorByIdUpdate = async (id: string, action:string) =>await repository.getDoctorByIdUpdate(id,action);

  const updateDoctorBlock = async (id: string, status: boolean) =>{
      await repository.updateDoctorBlock(id, status);
  }
    

  const getDoctorByemail = async (email: string) =>
    await repository.getDoctorByemail(email);

  const addDoctor = async (doctorData: doctorEntityType) =>
    await repository.addDoctor(doctorData);

  const verifyDoctor = async (token: string) =>
    await repository.verifyDoctor(token);

  const updateProfile = async (doctorID:string, doctorData : Record<string,any>)=>await repository.updateDoctorInfo(doctorID,doctorData);

  const getAllDoctors = async () => await repository.getAllDoctors();
 

  const registerGoogleSignedDoctor = async (doctor: googleSignInUserEntityType) =>await repository.registerGoogleSignedDoctor(doctor);
    return{
        getDoctorById,
        getDoctorByemail,
        addDoctor,
        verifyDoctor,
        updateProfile,
        registerGoogleSignedDoctor,
        getAllDoctors,
        updateDoctorBlock,
        getDoctorByIdUpdate,

    }
}

export type doctorDbInterface = typeof doctorDbRepository;