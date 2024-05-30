import TimeSlotEntity from "../../../entities/timeSlotEntity";
import { HttpStatus } from "../../../types/httpStatus";
import { TimeSlotDbInterface } from "../../../app/interfaces/timeSlotDbRepository";
import { TimeSlotDataInterface } from "../../../types/timeSlotInterface";
import CustomError from "../../../utils/customError";
import timeSlots from "../../../frameworks/database/mongodb/models/timeSlots";

export const addTimeSlot = async (
  data: any, 
  dbTimeSlotRepository: ReturnType<TimeSlotDbInterface>
) => {
  const { doctorId, startDate, endDate, slotTime } = data; 
  // Check if slot with the same doctor, startDate, and endDate already exists
  const existingSlot:any = await dbTimeSlotRepository.exsitingSlotAvailables(doctorId, startDate, endDate);
 
  if (existingSlot) {
    // Update the slotTime array if slot already exists
    existingSlot.slotTime = [...new Set([...existingSlot.slotTime, ...slotTime])];
    await existingSlot.save();
    return { status: true, message: 'Slots updated successfully' };
  } else {
    const newSlot = await dbTimeSlotRepository.addtimeSlot(doctorId, startDate, endDate, slotTime);
    return newSlot;
  }
}



  export const getAllTimeSlotsByDoctorId = async (
    doctorId: string,
    date: any,
    dbTimeSlotRepository: ReturnType<TimeSlotDbInterface>
  ) => await dbTimeSlotRepository.getAllTimeSlotsBydate(doctorId,date);



  export const getTimeSlotsByDoctorId = async (
    doctorId: string,
    dbTimeSlotRepository: ReturnType<TimeSlotDbInterface>
  ) => await dbTimeSlotRepository.getAllTimeSlots(doctorId);
  


  export const deleteTimeSlot = async (
    timeSlotId: string,
    dbTimeSlotRepository: ReturnType<TimeSlotDbInterface>
  ) => await dbTimeSlotRepository.removeTimeSlotbyId(timeSlotId);


  export const getDateSlotsByDoctorId = async (
    doctorId: string,
    dbTimeSlotRepository: ReturnType<TimeSlotDbInterface>
  ) => await dbTimeSlotRepository.getAllDateSlots(doctorId);

  