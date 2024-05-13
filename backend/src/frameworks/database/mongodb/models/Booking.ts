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
  patientGender:{
    type:String,
  },
    consultationType: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String, 
    required: true, 
  },
  appoinmentStatus:{
    type:String,
    default:"Booked"
  },
  appoinmentCancelReason:{
    type:String,
  },
  date:{
    type:String,
    require:true,
  },
  timeSlot:{
    type:String,
    required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model("Booking",bookingSchema);