import { TimeSlotEntityType } from "../../../../entities/timeSlotEntity";
import TimeSlot from "../models/timeSlots";

export const timeSlotRepositoryMongodb = () => {
  const addTimeSlots = async (doctorId:string,time:string) =>
    await TimeSlot.create({
      doctorId: doctorId,
      time: time, 
    });

   const getSlotByTime = async (
    doctorId: string,
    time:string,
   ) => await TimeSlot.findOne({ doctorId, time});

  
  const getAllTimeSlots = async (doctorId: string) =>
    await TimeSlot.find({ doctorId }).sort({ time: -1 });

  const removeTimeSlotbyId = async (id: string) =>
    await TimeSlot.findByIdAndDelete(id);

  return {
    addTimeSlots,
    getAllTimeSlots,
    getSlotByTime,
    removeTimeSlotbyId,
  };
};

export type TimeSlotRepositoryMongodbType = typeof timeSlotRepositoryMongodb;