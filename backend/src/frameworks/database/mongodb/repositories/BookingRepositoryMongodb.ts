import mongoose from "mongoose";
import { BookingEntityType } from "../../../../entities/bookingEntity";
import Booking from "../models/Booking";
import { Types } from "mongoose";
import { get } from "mongoose";
import wallet from "../models/wallet";
import Transactions  from "../models/transations";


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
          appoinmentCancelReason:data.getAppoinmentCancelReason(),
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

    const changeBookingStatus = async (appoinmentStatus: string,cancelReason:string, id: string) => {
      try {
        await Booking.findByIdAndUpdate(id, { appoinmentStatus: appoinmentStatus,  appoinmentCancelReason: cancelReason});
      } catch (error) {
        console.error('Error updating booking status:', error);
      }
    };

    const changeBookingstatusPayment = async (id: string) => {
      return await Booking.findByIdAndUpdate(id, { paymentStatus: "Success" });
    };
    
    const changeWalletMoney = async (fee:number,userId:string)=>{
      const walletData = await wallet.findOne({userId:userId});

      if (!walletData) {
        throw new Error('Wallet not found for the user');
      }

       // Calculate the new balance
       //@ts-ignore
    const newBalance = walletData.balance + fee;

    // Update the wallet with the new balance
    //@ts-ignore
    walletData?.balance = newBalance;
    //@ts-ignore
    await walletData.save();  
    }


    const changeTheWallet = async(fees:any,UserId:any)=>{
      const walletData = await wallet.findOne({userId:UserId});

      if(!walletData){
        throw new Error("Wallet not found");
      }

      const newBalance = walletData.balance-fees;
      //@ts-ignore
      walletData?.balance= newBalance;
      await walletData.save()
    }

    const getWalletBalance = async(userId:any)=>{
      const walletData = await wallet.findOne({userId:userId});

      const balanceAmount = walletData?.balance;
      return balanceAmount;
    }


    const  amountDebit = async(userId:any,Amount:any)=>{
      const WalletId = await wallet.findOne({userId:userId});

      const walletTransaction = await Transactions.create({
        walletId:WalletId,
        userId:userId,
        amount:Amount,
        type:"Debit",
        Description:"Wallet Payment"
      });
    }



    const amountCredit = async(fee:any,UserId:any)=>{
      const WalletId = await wallet.findOne({userId:UserId});

      const walletTransaction = await Transactions.create({
        walletId:WalletId,
        userId:UserId,
        amount:fee,
        type:"Credit",
        Description:"Refund Amound"
      });

    }

    
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
        changeWalletMoney,
        changeTheWallet,
        getWalletBalance,
        amountDebit,
        amountCredit,
    }    

}



export type BookingRepositoryMongodbType = typeof bookingRepositoryMongodb;