import bookingEntity from "../../../../entities/bookingEntity";
import { BookingDbRepositoryInterface } from "../../../interfaces/bookingDbRepository";
import { doctorDbInterface, doctorDbRepository } from "../../../interfaces/doctorDBRepository";
import configKeys from "../../../../config";
import { TimeSlotDbInterface } from "../../../interfaces/timeSlotDbRepository";
import { userDbInterface } from "../../../interfaces/userDbRepository";
import CustomError from "../../../../utils/customError";
import { HttpStatus } from "../../../../types/httpStatus";
import { Types } from "mongoose";
import { ObjectId } from "mongoose";

export const appoinmentBooking = async(
    data: any,
    userId: string,
    bookingDbRepository: ReturnType<BookingDbRepositoryInterface>,
    doctorDbRepository: ReturnType<doctorDbInterface>,
)=>{
    const {doctorId,doctorName,selectedPackage,selectedTimeSlot,patientName,patientAge,patientNumber,patientProblem,selectedDate,selectedPackageAmount} = data;
    const doctorDetails = await doctorDbRepository.getDoctorById(doctorId);
    const appoinment = bookingEntity(
        userId,
        doctorId,
        selectedPackage,
        selectedTimeSlot,
        selectedDate,
        selectedPackageAmount,
        patientName,
        patientAge,
        patientNumber,
        patientProblem,

    );
    const booking = await bookingDbRepository.createBooking(appoinment);

    return booking;
}