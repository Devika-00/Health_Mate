import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  slots: [{
    day: {
      type: Number,
      required: true,
      min: 0,
      max: 6,
    },
    times: [{
      start: {
        type: String,
        required: true,
      },
      end: {
        type: String,
        required: true,
      }
    }],
  }],
  available: {
    type: Boolean,
    default: true,
  },
});

// Index to ensure unique time slots for a doctor within a given date range
timeSlotSchema.index({ doctorId: 1, startDate: 1, endDate: 1 }, { unique: true });

export default mongoose.model('TimeSlot', timeSlotSchema);
