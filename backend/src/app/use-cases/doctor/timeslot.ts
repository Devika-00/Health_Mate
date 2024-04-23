import TimeSlotEntity from "../../../entities/timeSlotEntity";
import { HttpStatus } from "../../../types/httpStatus";
import { TimeSlotDbInterface } from "../../../app/interfaces/timeSlotDbRepository";
import { TimeSlotDataInterface } from "../../../types/timeSlotInterface";
import CustomError from "../../../utils/customError";

export const addTimeSlot = async (
  doctorId: string,
  timeData: TimeSlotDataInterface, // Object containing both time and date
  dbTimeSlotRepository: ReturnType<TimeSlotDbInterface>
) => {
  const { time, date } = timeData; // Destructure time and date from timeData
   
  const isTimeSlotExists = await dbTimeSlotRepository.isTimeSlotExist(
    doctorId,
    time,
    date,
  );

  if (isTimeSlotExists)
    throw new CustomError("Time slot already exists", HttpStatus.BAD_REQUEST);

  const newSlot = await dbTimeSlotRepository.addtimeSlot(doctorId, time, date);
  return newSlot;
};


  export const getTimeSlotsByDoctorId = async (
    doctorId: string,
    date:any,
    dbTimeSlotRepository: ReturnType<TimeSlotDbInterface>
  ) => await dbTimeSlotRepository.getAllTimeSlots(doctorId,date);


  export const deleteTimeSlot = async (
    timeSlotId: string,
    dbTimeSlotRepository: ReturnType<TimeSlotDbInterface>
  ) => await dbTimeSlotRepository.removeTimeSlotbyId(timeSlotId);


  export const getDateSlotsByDoctorId = async (
    doctorId: string,
    dbTimeSlotRepository: ReturnType<TimeSlotDbInterface>
  ) => await dbTimeSlotRepository.getAllDateSlots(doctorId);

  