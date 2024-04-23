export default function TimeSlotEntity(
  doctorId: string,
  time: string,
  date: string,
  isAvailable: boolean = true
) {
  return {
    doctorId: (): string => doctorId,
    time: (): string => time,
    date: (): string => date,
    isAvailable: (): boolean => isAvailable,
  };
}

export type TimeSlotEntityType = ReturnType<typeof TimeSlotEntity>;