import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
      },
      password: {
        type: String,
      },
      phoneNumber:{
        type:String,
      },
      department:{
        type:String,
      },
      role: {
        type: String,
        enum: ["doctor"],
        default: "doctor",
      },
      education:{
        type:String,
      },
      description:{
        type:String,
      },
      lisenceCertificate:{
        type:String,
      },
      gender:{
        type:String,    
    },
    profileImage:{
        type:String,
    },isVerified: {
        type: Boolean,
        default: false,
      },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    isApproved:{
      type:Boolean,
      default:false,
    },
    status:{
      type:String,
      default:"pending",
    },
    createdAt:{
        type:Date,
        default: new Date(),
    },
    verificationToken: String,
},
{timestamps:true}
)

export default mongoose.model("Doctor",doctorSchema);