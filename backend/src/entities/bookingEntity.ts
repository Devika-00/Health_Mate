// src/entities/Booking.ts

export default function bookingEntity(
  userId: string,
  doctorId: string,
  patientName: string,
  patientAge: string,
  patientNumber: string,
  patientGender: string,
  consultionType:string,
  fee:number,
  paymentStatus:string,
  appoinmentStatus:string,
  appoinmentCancelReason:string,
  date:string,
  timeSlot:string,
  
) {


  return {
    getUserId: (): string => userId,
    getDoctorId: (): string => doctorId,
    getPatientName: (): string => patientName,
    getPatientAge: (): string => patientAge,
    getPatientNumber: (): string => patientNumber,
    getPatientGender:() : string =>patientGender,
    getConsultationType:() :string =>consultionType,
    getFee:() :number=>fee,
    getPaymentStatus:():string=>paymentStatus,
    getAppoinmentStatus:():string=>appoinmentStatus,
    getAppoinmentCancelReason:():string=>appoinmentCancelReason,
    getDate:():string=>date,
    getTimeSlot:():string=>timeSlot,
  
  };
}

export type BookingEntityType = ReturnType<typeof bookingEntity>;
