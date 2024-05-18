import { PrescriptionRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/prescriptionRepositoryMongodb";
import { PrescriptionEntityType } from "../../entities/prescriptionEntity";

export const prescriptionDbRepository = (
  repository: ReturnType<PrescriptionRepositoryMongodbType>
) => {

const addPrescription = async (data:any) =>
    await repository.addPrescriptions(data);

const fetchPrescription = async (data:any)=>
  await repository.fetPrescriptions(data);

return {
    addPrescription,
    fetchPrescription,
}

};
export type PrescriptionDbInterface = typeof prescriptionDbRepository;    