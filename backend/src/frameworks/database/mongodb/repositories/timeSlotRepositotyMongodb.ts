import { TimeSlotEntityType } from "../../../../entities/timeSlotEntity";
import TimeSlot from "../models/timeSlots";

export const timeSlotRepositoryMongodb = () => {
  const addTimeSlots = async (doctorId:string,startDate:string,endDate:string,slotTime:[]) =>
    await TimeSlot.create({
      doctorId: doctorId,
      startDate:startDate,
      endDate:endDate,
      slotTime:slotTime,
      isAvailable:true,
    });

   const getSlotByTime = async (
    doctorId: string,
    time:string,
    
   ) => await TimeSlot.findOne({ doctorId, time});

  
  const getAllTimeSlots = async (doctorId: string) =>
    await TimeSlot.find({ doctorId }).sort({ time: -1 });

  const getAllDateSlots = async (doctorId: string) =>
    await TimeSlot.find({ doctorId  }).sort({ date: -1 });


  const removeTimeSlotbyId = async (id: string) =>
    await TimeSlot.findByIdAndDelete(id);

  const existingSlotAvailable = async (doctorId: string, startDate: any, endDate: any) => {
    return await TimeSlot.findOne({ doctorId, startDate, endDate });
}



  return {
    addTimeSlots,
    getAllTimeSlots,
    getSlotByTime,
    removeTimeSlotbyId,
    getAllDateSlots,
    existingSlotAvailable
  };
};

export type TimeSlotRepositoryMongodbType = typeof timeSlotRepositoryMongodb;