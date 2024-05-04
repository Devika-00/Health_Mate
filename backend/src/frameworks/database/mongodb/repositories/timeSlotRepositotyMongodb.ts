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
    await TimeSlot.find({ doctorId }).sort({ slotTime: -1 });

  const getAllTimeSlotsByDate = async (doctorId: string, date: Date) => {
    try {
      const timeSlots = await TimeSlot.find({
        doctorId,
        startDate: { $lte: date },
        endDate: { $gte: date }
      }).sort({ slotTime: -1 });
  
      return timeSlots;
    } catch (error) {
      console.error('Error fetching time slots:', error);
      throw error;
    }
  };

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
    existingSlotAvailable,
    getAllTimeSlotsByDate,
  };
};

export type TimeSlotRepositoryMongodbType = typeof timeSlotRepositoryMongodb;