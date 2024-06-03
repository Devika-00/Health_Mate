import { doctorEntityType, googleSignInUserEntityType } from "../../entities/doctorEntity";
import { doctorRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/doctorRepositoryMongodb";
import { DoctorInterface } from "../../types/doctorInterface";

interface DoctorFilterParams {
  searchQuery?: string;
  department?: string;
  selectedDate?: string;
  selectedTimeSlot?: string;
  page: number;
  limit: number;
}

export const doctorDbRepository = (
    repository:ReturnType<doctorRepositoryMongodbType>
)=>{
    const getDoctorById = async (id: string) =>await repository.getDoctorById(id);

    const getDoctorByIdUpdate = async (id: string, status:string) =>
      await repository.getDoctorByIdUpdate(id,status);
    

    const getDoctorByIdUpdateRejected = async (id: string, status:string,reason:string) =>await repository.getDoctorByIdUpdateRejected(id,status,reason);

  const updateDoctorBlock = async (id: string, status: boolean) =>{
      await repository.updateDoctorBlock(id, status);
  }

  // Update the function signature to use the defined type
const getFilteredDoctors = async ({
  searchQuery,
  department,
  selectedDate,
  selectedTimeSlot,
  page,
  limit,
}: DoctorFilterParams) => 
  await repository.getFilteredDoctors({
    searchQuery,
    department,
    selectedDate,
    selectedTimeSlot,
    page,
    limit,
  });
    

  const getDoctorByemail = async (email: string) =>
    await repository.getDoctorByemail(email);

  const addDoctor = async (doctorData: doctorEntityType) =>
    await repository.addDoctor(doctorData);

  const verifyDoctor = async (token: string) =>
    await repository.verifyDoctor(token);

  const updateProfile = async (doctorID:string, doctorData : Record<string,any>)=>await repository.updateDoctorInfo(doctorID,doctorData);

  const getAllDoctors = async () => await repository.getAllDoctors();
  
  const getAllAppoinments = async () => await repository.getAllAppoinments();

  const getRejectedDoctorById = async (id: string) =>await repository.getRejectedDoctorById(id);
 

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
        getDoctorByIdUpdateRejected,
        getRejectedDoctorById,
        getFilteredDoctors,
        getAllAppoinments,
    }
}

export type doctorDbInterface = typeof doctorDbRepository;