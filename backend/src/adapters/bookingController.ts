import { Request,Response,NextFunction } from "express";
import { doctorDbInterface } from "../app/interfaces/doctorDBRepository";
import { doctorRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/doctorRepositoryMongodb";
import { userDbInterface } from "../app/interfaces/userDbRepository";
import { userRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/userRepositoryMongodb";
import { TimeSlotDbInterface } from "../app/interfaces/timeSlotDbRepository";
import { TimeSlotRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/timeSlotRepositotyMongodb";
import { BookingDbRepositoryInterface} from "../app/interfaces/bookingDbRepository";
import { BookingRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/BookingRepositoryMongodb";
import { BookingEntityType } from "../entities/bookingEntity";
import { appoinmentBooking } from "../app/use-cases/user/Booking/bookingUser";
import { HttpStatus } from "../types/httpStatus";



const bookingController=(
    userDbRepository: userDbInterface,
    userRepositoryImpl: userRepositoryMongodbType,
    doctorDbRepository: doctorDbInterface,
    doctorDbRepositoryImpl: doctorRepositoryMongodbType,
    timeSlotDbRepository: TimeSlotDbInterface,
    timeSlotDbRepositoryImpl: TimeSlotRepositoryMongodbType,
    bookingDbRepository: BookingDbRepositoryInterface,
    bookingDbRepositoryImpl: BookingRepositoryMongodbType,
)=>{
    const dbRepositoryUser = userDbRepository(userRepositoryImpl());
    const dbDoctorRepository = doctorDbRepository(doctorDbRepositoryImpl());
    const dbTimeSlotRepository = timeSlotDbRepository(timeSlotDbRepositoryImpl());
    const dbBookingRepository = bookingDbRepository(bookingDbRepositoryImpl());


    const BookAppoinment = async (
        req:Request,
        res:Response,
        next:NextFunction,
    )=>{
        try {
            const data = req.body;
            const userId = req.user;
            const createBooking = await appoinmentBooking(
                data,
                userId,
                dbBookingRepository,
                dbDoctorRepository,
                
            );
            res.status(HttpStatus.OK).json({
                success: true,
                message: "Booking created successfully",
              });
            
        } catch (error) {
            next(error);
        }

    }

    return {BookAppoinment
        
    }
}

export default bookingController;

function apooinmentBooking(data: any, userId: any) {
    throw new Error("Function not implemented.");
}
