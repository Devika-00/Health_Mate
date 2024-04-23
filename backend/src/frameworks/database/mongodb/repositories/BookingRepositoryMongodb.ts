import mongoose from "mongoose";
import { BookingEntityType } from "../../../../entities/bookingEntity";
import Booking from "../models/Booking";
import { Types } from "mongoose";

export const bookingRepositoryMongodb = () => {

    const createBooking = async (data: BookingEntityType) =>
        await Booking.create({
          userId: data.getUserId(),
          doctorId: data.getDoctorId(),
          selectedPackage: data.getSelectedPackage(),
          selectedTimeSlot: data.getSelectedTimeSlot(),
          selectedDate:data.getSelectedDate(),
          patientName:data.getPatientName(),
          patientAge:data.getPatientAge(),
          patientNumber:data.getPatientNumber(),
          patientProblem:data.getPatientProblem(),
        });

    return{
        createBooking,
    }    
}



export type BookingRepositoryMongodbType = typeof bookingRepositoryMongodb;