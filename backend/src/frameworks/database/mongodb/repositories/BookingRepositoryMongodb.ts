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
          appoinmentStatus:data.getAppoinmentStatus(),
          date:data.getDate(),
          timeSlot:data.getTimeSlot(),
        });
      };


      const getAllPatients = async () => await Booking.find();

      const deleteSlot = async(doctorId:string,date:string,timeSlot:string) => 
        await Booking.findOne({doctorId: doctorId, timeSlot:timeSlot,date:date,})
          
      


      const getSinglePatient = async (id:string) => await Booking.findById(id);
      
      const updateBooking = async (
        bookingId: string,
        updatingData: Record<any, any>
    ) => {
        return await Booking.findOneAndUpdate({ bookingId }, {paymentStatus:"Paid"});
    };


    const getBookingById = async (bookingId: string) =>
      await Booking.findById({ _id:bookingId });

    const getAllBookingByUserId = async (userId: string) =>
      await Booking.find({ userId:userId });

    const getAllBookingByDoctorId = async (doctorId: string) =>
      await Booking.find({ doctorId:doctorId });

    const changeBookingStatus = async (appoinmentStatus: string, id: string) => {
      try {
        await Booking.findByIdAndUpdate(id, { appoinmentStatus: appoinmentStatus });
      } catch (error) {
        console.error('Error updating booking status:', error);
      }
    };

    const changeBookingstatusPayment = async (id:string) =>
      await Booking.findByIdAndUpdate(id,{PaymentStatus:"Success"});
    
    
    return{
        createBooking,
        getAllPatients,
        getSinglePatient,
        updateBooking,
        getBookingById,
        getAllBookingByUserId,
        deleteSlot,
        changeBookingStatus,
        getAllBookingByDoctorId,
        changeBookingstatusPayment,
    }    

}



export type BookingRepositoryMongodbType = typeof bookingRepositoryMongodb;