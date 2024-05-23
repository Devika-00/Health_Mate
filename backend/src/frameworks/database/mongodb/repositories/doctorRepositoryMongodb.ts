import { doctorEntityType, googleSignInUserEntityType } from "../../../../entities/doctorEntity";
import { DoctorInterface } from "../../../../types/doctorInterface";
import Doctor from "../models/doctor";

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
      query.doctorName = { $regex: searchQuery, $options: "i" };
    }

    if (department) {
      query.department = department;
    }

    if (selectedDate) {
      const date = new Date(selectedDate);
      query = {
        ...query,
        $or: [
          { startDate: { $lte: date }, endDate: { $gte: date } },
          {
            slotTime: selectedTimeSlot
              ? { $in: [selectedTimeSlot] }
              : { $exists: true },
          },
        ],
      };
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


  }

}

export type doctorRepositoryMongodbType =
  typeof doctorRepositoryMongodb;