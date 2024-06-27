import { TimeSlotRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/timeSlotRepositotyMongodb";
import { TimeSlotEntityType } from "../../entities/timeSlotEntity";

export const timeSlotDbRepository = (
  repository: ReturnType<TimeSlotRepositoryMongodbType>
) => {
  const addtimeSlot = async (doctorId:string, startDate:string,endDate:string,slotTime:any) =>{
    const timeslot = await repository.addTimeSlots(doctorId,startDate,endDate,slotTime);
    return timeslot
  }
  

  const isTimeSlotExist = async (
    doctorId: string,
    time: string,
    date:string,
  ) => await repository.getSlotByTime(doctorId,time);

  const exsitingSlotAvailables = async (doctorId: string, startDate: any, endDate: any) => {
    return await repository.existingSlotAvailable(doctorId, startDate, endDate);
}


  const getAllTimeSlotsBydate = async (doctorId: string,date:any) =>
    await repository.getAllTimeSlotsByDate(doctorId,date);

  const getAllTimeSlots = async (doctorId: string) =>
    await repository.getAllTimeSlots(doctorId);


  const getAllDateSlots = async (doctorId: string) =>
    await repository.getAllDateSlots(doctorId);

  const removeTimeSlotbyId = async (timeSlotId: string) =>
    await repository.removeTimeSlotbyId(timeSlotId);

  const getAllTimeSlot = async () => await repository.getAllTimeSlot();

  return {
    addtimeSlot,
    isTimeSlotExist,
    getAllTimeSlots,
    removeTimeSlotbyId,
    getAllDateSlots,
    exsitingSlotAvailables,
    getAllTimeSlotsBydate,
    getAllTimeSlot,
  };
};
export type TimeSlotDbInterface = typeof timeSlotDbRepository;