import { BookingEntityType } from "../../entities/bookingEntity";
import { BookingRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/BookingRepositoryMongodb";

export const bookingDbRepository = (
    repository: ReturnType<BookingRepositoryMongodbType>
  ) => {
    const createBooking = async (data: BookingEntityType) =>
        await repository.createBooking(data);

    
  const getAllPatients = async () => await repository.getAllPatients();

  const getSinglePatient = async (id:string) => await repository.getSinglePatient(id);

  const updateBookingDetails = async (
    bookingId: string,
    updatingData: Record<any, any>
  ) => await repository.updateBooking(bookingId, updatingData);


  const getBookingById = async (bookingId: string) =>
    await repository.getBookingById(bookingId);

    return {
        createBooking,
        getAllPatients,
        getSinglePatient,
        updateBookingDetails,
        getBookingById,
    }
  }

  export type BookingDbRepositoryInterface = typeof bookingDbRepository;