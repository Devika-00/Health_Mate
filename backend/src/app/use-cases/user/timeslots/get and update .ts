import { TimeSlotDbInterface } from "../../../../app/interfaces/timeSlotDbRepository";


export const getAllTimeSlot = async (timeSlotDbRepository: ReturnType<TimeSlotDbInterface>) =>
    await timeSlotDbRepository.getAllTimeSlot();