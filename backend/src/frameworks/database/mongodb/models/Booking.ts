import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId, ref: "Doctor",
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  patientName: {
    type: String,
  },
  patientAge:{
    type:String,
  },
  patientNumber:{
    tpe:String,
  },
  patientProblem:{
    type:String,
  },
    selectedPackage: {
    type: String,
    required: true,
  },
  selectedTimeSlot: {
    type: String,
    required: true,
  },
  payment:{
    type:Boolean,
    required:true,
    default:false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model("Booking",bookingSchema);