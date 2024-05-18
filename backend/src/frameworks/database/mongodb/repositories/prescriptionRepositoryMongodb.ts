import { PrescriptionEntityType } from "../../../../entities/prescriptionEntity";
import Booking from "../models/Booking";
import Prescription from "../models/Prescription";

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

    return {
        addPrescriptions,
        fetPrescriptions,
    }

};

export type PrescriptionRepositoryMongodbType = typeof prescriptionRepositoryMongodb;    