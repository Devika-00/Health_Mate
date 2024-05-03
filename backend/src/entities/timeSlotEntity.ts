export default function TimeSlotEntity(
  doctorId: string,
 startDate:string,
 endDate:string,
 slotTime:[string],
  isAvailable: boolean = true
) {
  return {
    doctorId: (): string => doctorId,
   startDate:():string=>startDate,
   endDate:():string=>endDate,
   slotTime:():[string]=>slotTime,
    isAvailable: (): boolean => isAvailable,
  };
}

export type TimeSlotEntityType = ReturnType<typeof TimeSlotEntity>;