import mongoose from "mongoose";
import { BookingEntityType } from "../../../../entities/bookingEntity";
import Booking from "../models/Booking";
import { Types } from "mongoose";

export const bookingRepositoryMongodb = () => {

    const createBooking = async (data: BookingEntityType) => { 
        return await Booking.create({
          userId: data.getUserId(),
          doctorId: data.getDoctorId(),
          selectedPackage: data.getSelectedPackage(),
          selectedTimeSlot: data.getSelectedTimeSlot(),
          selectedPackageAmount: data.getSelectedPackageAmount(),
          selectedDate: data.getSelectedDate(),
          patientName: data.getPatientName(),
          patientAge: data.getPatientAge(),
          patientNumber: data.getPatientNumber(),
          patientProblem: data.getPatientProblem(),
        });
      };


      const getAllPatients = async () => await Booking.find();


      const getSinglePatient = async (id:string) => await Booking.findById(id);
      

    return{
        createBooking,
        getAllPatients,
        getSinglePatient,
    }    
}



export type BookingRepositoryMongodbType = typeof bookingRepositoryMongodb;