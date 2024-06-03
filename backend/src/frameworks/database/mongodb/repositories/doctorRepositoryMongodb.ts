import { doctorEntityType, googleSignInUserEntityType } from "../../../../entities/doctorEntity";
import { DoctorInterface } from "../../../../types/doctorInterface";
import Booking from "../models/Booking";
import Doctor from "../models/doctor";
import timeSlots from "../models/timeSlots";

export const doctorRepositoryMongodb = () =>{
    const getDoctorById = async (id: string) =>
    await Doctor.findById(id).select(
      "-password -isVerified -isApproved -isRejected -verificationToken"
    );

  const getDoctorByemail = async (email: string) => {
    const doctor: DoctorInterface | null = await Doctor.findOne({
      email,
    });
    return doctor;
  };
  const addDoctor = async (doctorData: doctorEntityType) => {
    const newDoctor = new Doctor({
      doctorName: doctorData.getDoctorName(),
      email: doctorData.getEmail(),
      password: doctorData.getPassword(),
      verificationToken: doctorData.getVerificationToken(),
      phoneNumber:doctorData.getPhoneNumber(),
      department:doctorData.getDepartment(),
      consultationType:doctorData.getConsultationType(),
      education:doctorData.getEducation(),
      description:doctorData.getDescription(),
      experience:doctorData.getExperience(),
      rejectedReason:doctorData.getRejectedReason(),
      lisenceCertificate:doctorData.getLisenceCertificate(),
    });
    return await newDoctor.save();
  };

  const getDoctorByIdUpdate = async (id: string,status:string) =>await Doctor.findByIdAndUpdate(id,{status:status, isApproved:true}).select("-password -isVerified -isApproved -isRejected -verificationToken");

  const getDoctorByIdUpdateRejected = async (id: string,status:string,reason:string) =>await Doctor.findByIdAndUpdate(id,{status:status, isApproved:false, rejectedReason:reason}).select("-password -isVerified -isApproved -isRejected -verificationToken");

  const updateDoctorBlock = async (id: string, status: boolean) => {
    await Doctor.findByIdAndUpdate(id, { isBlocked: status });
  }

  
  const getFilteredDoctors = async ({
    searchQuery,
    department,
    selectedDate,
    selectedTimeSlot,
    page,
    limit,
  }: {
    searchQuery?: string;
    department?: string;
    selectedDate?: string;
    selectedTimeSlot?: string;
    page: number;
    limit: number;
  }) => {
    let query: Record<string, any> = {};
  
    if (searchQuery) {
      query.doctorName = { $regex: searchQuery, $options: 'i' };
    }
  
    if (department) {
      query.department = department;
    }
  
    // Initialize an array to hold doctor IDs matching date and/or time slot criteria
    let doctorIds: string[] = [];
  
    // Find doctor IDs with available time slots on the selected date
    if (selectedDate) {
      const date = new Date(selectedDate);
      const dateFilteredTimeSlots = await timeSlots.find({
        startDate: { $lte: date },
        endDate: { $gte: date },
        available: true,
      }).select('doctorId');
      doctorIds = dateFilteredTimeSlots.map((slot: any) => slot.doctorId.toString());
      
      // If no doctor IDs are found for the selected date, return an empty result
      if (doctorIds.length === 0) {
        return { total: 0, doctors: [] };
      }
    }
  
    // Find doctor IDs with available time slots at the selected time slot
    // Find doctor IDs with available time slots at the selected time slot
  if (selectedTimeSlot) {
  const [startTime, endTime] = selectedTimeSlot.split(' - ');

  // Find time slots that match the selected time slot
  const timeFilteredTimeSlots = await timeSlots.find({
    available: true,
    'slots.times.start': startTime,
    'slots.times.end': endTime,
  }).select('doctorId');

  const timeFilteredDoctorIds = timeFilteredTimeSlots.map((slot: any) => slot.doctorId.toString());

  // Combine doctor IDs if both date and time slot filters are provided
  if (selectedDate) {
    const dayOfWeek = new Date(selectedDate).getDay();
    const dateFilteredTimeSlots = await timeSlots.find({
      available: true,
      'slots.day': dayOfWeek,
    }).select('doctorId');

    const dateFilteredDoctorIds = dateFilteredTimeSlots.map((slot: any) => slot.doctorId.toString());
    doctorIds = doctorIds.filter(id => timeFilteredDoctorIds.includes(id) && dateFilteredDoctorIds.includes(id));
  } else {
    doctorIds = timeFilteredDoctorIds;
  }

  // If doctor IDs list becomes empty after filtering by time slot, return an empty result
  if (doctorIds.length === 0) {
    return { total: 0, doctors: [] };
  }
}
  
    // Add doctor IDs to the query if there are any filtered by date/time slot
    if (doctorIds.length > 0) {
      query._id = { $in: doctorIds };
    }
  
    const total = await Doctor.countDocuments(query);
    const doctors = await Doctor.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
  
    return { total, doctors };
  };

  const verifyDoctor = async (token: string) =>
    await Doctor.findOneAndUpdate(
      { verificationToken: token },
      { isVerified: true, verificationToken: null }
    );

    const updateDoctorInfo = async (id: string, updateData:Record<string,any>)=>await Doctor.findByIdAndUpdate(id,updateData,{new:true});  

    const getAllDoctors = async () => await Doctor.find({ isVerified: true }); 

    const getAllAppoinments = async () => await Booking.find({ appoinmentStatus: "Booked" }); 

    const registerGoogleSignedDoctor = async (doctor: googleSignInUserEntityType) =>
      await Doctor.create({
        doctorName: doctor.doctorName(),
        email: doctor.email(),
        profileImage: doctor.picture(),
        isVerified: doctor.email_verified(),
        
      });
    
    const getRejectedDoctorById = async (id: string) =>
        await Doctor.findByIdAndUpdate(id,{status:"pending"}).select(
          "-password -isVerified -isApproved -isRejected -verificationToken"
    ); 

  return {
    getDoctorById,
    getDoctorByemail,
    addDoctor,
    verifyDoctor,
    updateDoctorInfo,
    registerGoogleSignedDoctor,
    getAllDoctors,
    updateDoctorBlock,
    getDoctorByIdUpdateRejected,
    getDoctorByIdUpdate,
    getRejectedDoctorById,
    getFilteredDoctors,
    getAllAppoinments,


  }

}

export type doctorRepositoryMongodbType =
  typeof doctorRepositoryMongodb;