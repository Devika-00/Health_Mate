import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  time: String,
});

export default mongoose.model('TimeSlot', timeSlotSchema);


