import TimeSlotEntity from "../../../entities/timeSlotEntity";
import { HttpStatus } from "../../../types/httpStatus";
import { TimeSlotDbInterface } from "../../../app/interfaces/timeSlotDbRepository";
import { TimeSlotDataInterface } from "../../../types/timeSlotInterface";
import CustomError from "../../../utils/customError";

export const addTimeSlot = async (
    doctorId: string,
    timeData: TimeSlotDataInterface,
    dbTimeSlotRepository: ReturnType<TimeSlotDbInterface>
  ) => {
    const { time } = timeData;
    const isTimeSlotExists = await dbTimeSlotRepository.isTimeSlotExist(
      doctorId,
      time
    );
  
    if (isTimeSlotExists)
      throw new CustomError("Time slot already exists", HttpStatus.BAD_REQUEST);
  
    const newSlot = await dbTimeSlotRepository.addtimeSlot(doctorId, time);
    return newSlot;
  };

  export const getTimeSlotsByDoctorId = async (
    doctorId: string,
    dbTimeSlotRepository: ReturnType<TimeSlotDbInterface>
  ) => await dbTimeSlotRepository.getAllTimeSlots(doctorId);


  export const deleteTimeSlot = async (
    timeSlotId: string,
    dbTimeSlotRepository: ReturnType<TimeSlotDbInterface>
  ) => await dbTimeSlotRepository.removeTimeSlotbyId(timeSlotId);
  