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
import { appoinmentBooking, createPayment, getBookingByBookingId, getBookingByUserId, updateBookingStatus } from "../app/use-cases/user/Booking/bookingUser";
import { HttpStatus } from "../types/httpStatus";
import { getUserById } from "../app/use-cases/user/auth/userAuth";



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

            const user = await getUserById(userId,dbRepositoryUser)
            const sessionId= await createPayment(
              user?.name!,
              user?.email!,
              createBooking.id,
              createBooking.fee,  
            );

            res.status(HttpStatus.OK).json({
                success: true,
                message: "Booking created successfully",
                id:sessionId,
              });
            
        } catch (error) {
            next(error);
        }

    }

     /**
   * *METHOD :PATCH
   * * Update payment status and table slot information if payment status is failed
   */

  const updatePaymentStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { paymentStatus } = req.body;
      await updateBookingStatus(
        id,
        paymentStatus,
        dbBookingRepository,
      );
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Booking status updated" });
    } catch (error) {
      next(error)

    }
  }


  /*
   * * METHOD :GET
   * * Retrieve booking details
   */
  const getBookingDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { bookingID } = req.params;
      const userID = req.user;
      const  data  = await getBookingByBookingId(
        bookingID,
        dbBookingRepository
      );
      res.status(HttpStatus.OK).json({
        success: true,
        message: "Bookings details fetched successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  };


  /*
   * * METHOD :GET
   * * Retrieve booking details
   */
  const getAllBookingDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const  {id}  = req.params;
      const  data  = await getBookingByUserId(
        id,
        dbBookingRepository
      );
      res.status(HttpStatus.OK).json({
        success: true,
        message: "Bookings details fetched successfully",
        data,
      });
    } catch (error) {
      next(error);
    }
  };




    return {BookAppoinment,
        updatePaymentStatus,
        getBookingDetails,
        getAllBookingDetails,
        }
   
}

export default bookingController;


