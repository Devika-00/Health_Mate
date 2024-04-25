import { BookingEntityType } from "../../entities/bookingEntity";
import { BookingRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/BookingRepositoryMongodb";

export const bookingDbRepository = (
    repository: ReturnType<BookingRepositoryMongodbType>
  ) => {
    const createBooking = async (data: BookingEntityType) =>
        await repository.createBooking(data);

    
  const getAllPatients = async () => await repository.getAllPatients();

  const getSinglePatient = async (id:string) => await repository.getSinglePatient(id);


    return {
        createBooking,
        getAllPatients,
        getSinglePatient,
    }
  }

  export type BookingDbRepositoryInterface = typeof bookingDbRepository;