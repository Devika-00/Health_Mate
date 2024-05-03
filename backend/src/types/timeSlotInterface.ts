import { Types } from "mongoose";


export interface TimeSlotDataInterface {
   startDate:string,
   endDate:string,
   slotTime:[],
   isAvailable:Boolean,
  }