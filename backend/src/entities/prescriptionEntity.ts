export default function PrescriptionEntity(
    doctorId: string,
    userId: string,
    appointmentId: string,
    prescriptionDate: string,
    medicines: { name: string; dosage: string; instructions?: string }[]
  ) {
    return {
      doctorId: (): string => doctorId,
      userId: (): string => userId,
      appointmentId: (): string => appointmentId,
      prescriptionDate: (): string => prescriptionDate,
      medicines: (): { name: string; dosage: string; instructions?: string }[] => medicines,
    };
  }
  
  export type PrescriptionEntityType = ReturnType<typeof PrescriptionEntity>;
  