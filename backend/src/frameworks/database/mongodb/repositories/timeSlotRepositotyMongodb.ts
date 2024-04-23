import { TimeSlotEntityType } from "../../../../entities/timeSlotEntity";
import TimeSlot from "../models/timeSlots";

export const timeSlotRepositoryMongodb = () => {
  const addTimeSlots = async (doctorId:string,time:string,date:string) =>
    await TimeSlot.create({
      doctorId: doctorId,
      time: time, 
      date:date,
      isAvailable:true,
    });

   const getSlotByTime = async (
    doctorId: string,
    time:string,
    date:string,
   ) => await TimeSlot.findOne({ doctorId, time,date});

  
  const getAllTimeSlots = async (doctorId: string,date:string) =>
    await TimeSlot.find({ doctorId , date }).sort({ time: -1 });

  const getAllDateSlots = async (doctorId: string) =>
    await TimeSlot.find({ doctorId  }).sort({ date: -1 });


  const removeTimeSlotbyId = async (id: string) =>
    await TimeSlot.findByIdAndDelete(id);

  return {
    addTimeSlots,
    getAllTimeSlots,
    getSlotByTime,
    removeTimeSlotbyId,
    getAllDateSlots,
  };
};

export type TimeSlotRepositoryMongodbType = typeof timeSlotRepositoryMongodb;