import { PrescriptionDbInterface } from "../../interfaces/prescriptionDbRepository";

export const addPrescriptionToUser = async (
    data:any,
    dbPrescriptionRepository:ReturnType<PrescriptionDbInterface>
)=>{
    const response = await dbPrescriptionRepository.addPrescription(data);
    return response;
}

export const fetchPrescriptionUsecase = async (
    data:any,
    dbPrescriptionRepository:ReturnType<PrescriptionDbInterface>
)=>{
    const response = await dbPrescriptionRepository.fetchPrescription(data);
    return response;
}

export const uploadLabDocuments = async (
    appoinmentId:string,
    data:any,
    dbPrescriptionRepository:ReturnType<PrescriptionDbInterface>
)=>{
    const response = await dbPrescriptionRepository.uploadDocuments(appoinmentId,data);
    return response;
}

export const getDocuments = async (
    appoinmentId:string,
    dbPrescriptionRepository:ReturnType<PrescriptionDbInterface>
)=>{
    const response = await dbPrescriptionRepository.getLabDocuments(appoinmentId);
    return response;
}

export const fetchPrescriptionForDoctor = async (
    data:any,
    dbPrescriptionRepository:ReturnType<PrescriptionDbInterface>
)=>{
    const response = await dbPrescriptionRepository.fetchPrescriptionDoctor(data);
    return response;
}

export const deletePrescriptionData = async (
    prescriptionId:any,
    dbPrescriptionRepository:ReturnType<PrescriptionDbInterface>
)=>{
    const response = await dbPrescriptionRepository.deletePrescriptionDetails(prescriptionId);
    return response;
}


export const deleteSingleDocument = async (
    id:any,
    dbPrescriptionRepository:ReturnType<PrescriptionDbInterface>
)=>{
    const response = await dbPrescriptionRepository.deleteDocumentSingle(id);
    return response
}