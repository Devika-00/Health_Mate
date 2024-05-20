import { PrescriptionEntityType } from "../../../../entities/prescriptionEntity";
import Booking from "../models/Booking";
import Prescription from "../models/Prescription";
import Document from "../models/Document";
import { fetchPrescriptionForDoctor } from "../../../../app/use-cases/Prescription/prescriptionUseCase";

export const prescriptionRepositoryMongodb = () => {

    const addPrescriptions = async (data: any) => {
        const { appointmentId, prescriptionDate, medicines } = data;
      
        try {
          // Find the appointment by ID
          const appointment = await Booking.findById(appointmentId);
      
          if (!appointment) {
            return { status: false, message: "Appointment not found" };
          }
          const { userId, doctorId } = appointment;
      
          // Validate prescriptionDate and medicines
          if (!prescriptionDate || !medicines.length) {
            return { status: false, message: "Required fields are missing" };
          }
      
          // Create a new Prescription document
          const newPrescription = new Prescription({
            appointmentId,
            doctorId,
            userId,
            prescriptionDate,
            medicines,
          });
      
          // Save the new prescription
          const savedPrescription = await newPrescription.save();
      
          return savedPrescription;
        } catch (error) {
          console.error('Error adding prescription:', error);
          return { status: false, message: "An error occurred while adding prescription" };
        }
      };


      const fetPrescriptions = async(data:any)=>{
        const {appoinmentId} = data
        const prescription = await Prescription.findOne({
          appointmentId:appoinmentId}); 
          return prescription
      }


      const fetchPrescriptionlist = async(data:any)=>{
        const prescription = await Prescription.find({appointmentId:data});
        return prescription;
      }


      const uploadDocument = async (appoinmentId:any, documentsData:any) => {
        try {
            // Loop through each document and save it to the database
            const savedDocuments = await Promise.all(documentsData.map(async (doc:any) => {
                const newDocument = new Document({
                    appoinmentId: appoinmentId,
                    fileName: doc.name,
                    fileData: doc.url,
                });
                return await newDocument.save();
            }));
    
            return savedDocuments;
        } catch (error) {
            console.error('Error uploading documents:', error);
            throw new Error('Error uploading documents');
        }
    };


    const getLabDocument = async (appoinmentId:string) =>{
      const response = await Document.find({appoinmentId:appoinmentId});
      return response;
    }

    const deletePrescriptionDetail = async (prescriptionId:any)=>{
      const response = await Prescription.findOneAndDelete({_id:prescriptionId});
      return response;
    }

    const deleteDocumentSingles = async (id:any) =>{
      const response = await Document.findOneAndDelete({_id:id});
      return response;
    }

    return {
        addPrescriptions,
        fetPrescriptions,
        uploadDocument,
        getLabDocument,
        fetchPrescriptionlist,
        deletePrescriptionDetail,
        deleteDocumentSingles,
    }

};

export type PrescriptionRepositoryMongodbType = typeof prescriptionRepositoryMongodb;    