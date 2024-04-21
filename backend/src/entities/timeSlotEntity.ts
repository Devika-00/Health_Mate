export default function TimeSlotEntity(
    doctorId: string,
   time:string,
  ) {
    return {
      doctorId: (): string => doctorId,
     time:(): string =>time,
    };
  }
  export type TimeSlotEntityType = ReturnType<typeof TimeSlotEntity>;