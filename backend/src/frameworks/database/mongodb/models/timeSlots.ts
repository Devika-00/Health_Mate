import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  slotTime: {
    type: [String], 
    required: true
  },

  
  available: {
    type: Boolean,
    default: true
  }


});

timeSlotSchema.index({ doctor: 1, startDate: 1, endDate: 1 }, { unique: true });


export default mongoose.model('TimeSlot', timeSlotSchema);
