import { TimeSlotRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/timeSlotRepositotyMongodb";
import { TimeSlotEntityType } from "../../entities/timeSlotEntity";

export const timeSlotDbRepository = (
  repository: ReturnType<TimeSlotRepositoryMongodbType>
) => {
  const addtimeSlot = async (doctorId:string, time:string,date:string) =>
    await repository.addTimeSlots(doctorId,time,date);
  

  const isTimeSlotExist = async (
    doctorId: string,
    time: string,
    date:string,
  ) => await repository.getSlotByTime(doctorId,time,date);

  

  const getAllTimeSlots = async (doctorId: string,date:string) =>
    await repository.getAllTimeSlots(doctorId,date);

  const getAllDateSlots = async (doctorId: string) =>
    await repository.getAllDateSlots(doctorId);

  const removeTimeSlotbyId = async (timeSlotId: string) =>
    await repository.removeTimeSlotbyId(timeSlotId);

  return {
    addtimeSlot,
    isTimeSlotExist,
    getAllTimeSlots,
    removeTimeSlotbyId,
    getAllDateSlots,
  };
};
export type TimeSlotDbInterface = typeof timeSlotDbRepository;