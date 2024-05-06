import mongoose from "mongoose";
import { BookingEntityType } from "../../../../entities/bookingEntity";
import Booking from "../models/Booking";
import { Types } from "mongoose";
import { get } from "mongoose";

export const bookingRepositoryMongodb = () => {

    const createBooking = async (data: BookingEntityType) => { 
        return await Booking.create({
          userId: data.getUserId(),
          doctorId: data.getDoctorId(),
          patientName: data.getPatientName(),
          patientAge: data.getPatientAge(),
          patientNumber: data.getPatientNumber(),
          patientGender:data.getPatientGender(),
          consultationType:data.getConsultationType(),
          fee:data.getFee(),
          paymentStatus:data.getPaymentStatus(),
          date:data.getDate(),
          timeSlot:data.getTimeSlot(),
        });
      };


      const getAllPatients = async () => await Booking.find();


      const getSinglePatient = async (id:string) => await Booking.findById(id);
      
      const updateBooking = async (
        bookingId: string,
        updatingData: Record<any, any>
    ) => {
        return await Booking.findOneAndUpdate({ bookingId }, {paymentStatus:"Paid"});
    };


    const getBookingById = async (bookingId: string) =>
      await Booking.findOne({ bookingId });
    
    
    return{
        createBooking,
        getAllPatients,
        getSinglePatient,
        updateBooking,
        getBookingById,
    }    
}



export type BookingRepositoryMongodbType = typeof bookingRepositoryMongodb;