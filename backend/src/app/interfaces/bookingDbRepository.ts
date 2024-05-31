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

  const getAllBookingByDoctorId = async (doctorId: string) =>
    await repository.getAllBookingByDoctorId(doctorId);

  const changeBookingstatus = async (appoinmentStatus:string,cancelReason:string,id:string)=>
    await repository.changeBookingStatus(appoinmentStatus,cancelReason,id);

  const changeBookingstatusPayment = async(id:string)=>
    await repository.changeBookingstatusPayment(id)

  const changeWallet = async(fee:number,userId:string)=>
    await repository.changeWalletMoney(fee,userId);

  const changeTheWalletAmount = async(fees:any,UserId:any)=>{
    await repository.changeTheWallet(fees,UserId);
  }

  const getBalanceAmount = async(userId:any)=>{
    const balance = await repository.getWalletBalance(userId);
    return balance
  }

  const debitAmount = async(userId:any,Amount:any)=>{
    const amount  = await repository.amountDebit(userId,Amount);
  }

  const creditAmount = async(fee:any,UserId:any)=>{
    const amount = await repository.amountCredit(fee,UserId);
  }



    return {
        createBooking,
        getAllPatients,
        getSinglePatient,
        updateBookingDetails,
        getBookingById,
        getAllBookingByUserId,
        deleteSlot,
        changeBookingstatus,
        getAllBookingByDoctorId,
        changeBookingstatusPayment,
        changeWallet,
        changeTheWalletAmount,
        getBalanceAmount,
        debitAmount,
        creditAmount,
       
    }
  }

  export type BookingDbRepositoryInterface = typeof bookingDbRepository;