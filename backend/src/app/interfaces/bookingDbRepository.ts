import { BookingEntityType } from "../../entities/bookingEntity";
import { BookingRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/BookingRepositoryMongodb";

export const bookingDbRepository = (
    repository: ReturnType<BookingRepositoryMongodbType>
  ) => {
    const createBooking = async (data: BookingEntityType) =>
        await repository.createBooking(data);

    
  const getAllPatients = async () => await repository.getAllPatients();

  const deleteSlot = async(doctorId:string,date:string,timeSlot:string)=>
    await repository.deleteSlot(doctorId,date,timeSlot)
  

  const getSinglePatient = async (id:string) => await repository.getSinglePatient(id);

  const updateBookingDetails = async (
    bookingId: string,
    updatingData: Record<any, any>
  ) => await repository.updateBooking(bookingId, updatingData);


  const getBookingById = async (bookingId: string) =>
    await repository.getBookingById(bookingId);

  const getAllBookingByUserId = async (userId: string) =>
    await repository.getAllBookingByUserId(userId);

    return {
        createBooking,
        getAllPatients,
        getSinglePatient,
        updateBookingDetails,
        getBookingById,
        getAllBookingByUserId,
        deleteSlot,
    }
  }

  export type BookingDbRepositoryInterface = typeof bookingDbRepository;