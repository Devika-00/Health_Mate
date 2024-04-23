// src/entities/Booking.ts

export default function bookingEntity(
  userId: string,
  doctorId: string,
  selectedPackage: "Messaging" | "Voice Call" | "Video Call" | "In Person",
  selectedTimeSlot: string,
  selectedDate:string,
  patientName: string,
  patientAge: string,
  patientNumber: string,
  patientProblem: string,
  
) {


  return {
    getUserId: (): string => userId,
    getDoctorId: (): string => doctorId,
    getSelectedPackage: (): "Messaging" | "Voice Call" | "Video Call" | "In Person" => selectedPackage,
    getSelectedTimeSlot: (): string => selectedTimeSlot,
    getSelectedDate:() : string =>selectedDate,
    getPatientName: (): string => patientName,
    getPatientAge: (): string => patientAge,
    getPatientNumber: (): string => patientNumber,
    getPatientProblem: (): string => patientProblem
  };
}

export type BookingEntityType = ReturnType<typeof bookingEntity>;
