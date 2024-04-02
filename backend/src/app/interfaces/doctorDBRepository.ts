import { doctorEntityType } from "../../entities/doctorEntity";
import { doctorRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/doctorRepositoryMongodb";
import { DoctorInterface } from "../../types/doctorInterface";

export const doctorDbRepository = (
    repository:ReturnType<doctorRepositoryMongodbType>
)=>{
    const getDoctorById = async (id: string) =>
    await repository.getDoctorById(id);

  const getDoctorByemail = async (email: string) =>
    await repository.getDoctorByemail(email);

  const addDoctor = async (doctorData: doctorEntityType) =>
    await repository.addDoctor(doctorData);

  const verifyDoctor = async (token: string) =>
    await repository.verifyDoctor(token);

    return{
        getDoctorById,
        getDoctorByemail,
        addDoctor,
        verifyDoctor,
    }
}

export type doctorDbInterface = typeof doctorDbRepository;