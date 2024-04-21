import { TimeSlotRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/timeSlotRepositotyMongodb";
import { TimeSlotEntityType } from "../../entities/timeSlotEntity";

export const timeSlotDbRepository = (
  repository: ReturnType<TimeSlotRepositoryMongodbType>
) => {
  const addtimeSlot = async (doctorId:string, time:string) =>
    await repository.addTimeSlots(doctorId,time);
  

  const isTimeSlotExist = async (
    doctorId: string,
    time: string,
  ) => await repository.getSlotByTime(doctorId,time);

  

  const getAllTimeSlots = async (doctorId: string) =>
    await repository.getAllTimeSlots(doctorId);

  const removeTimeSlotbyId = async (timeSlotId: string) =>
    await repository.removeTimeSlotbyId(timeSlotId);

  return {
    addtimeSlot,
    isTimeSlotExist,
    getAllTimeSlots,
    removeTimeSlotbyId,
  };
};
export type TimeSlotDbInterface = typeof timeSlotDbRepository;