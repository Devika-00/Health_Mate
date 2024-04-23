import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: String,
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model('TimeSlot', timeSlotSchema);
