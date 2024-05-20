import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    appoinmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    fileData: {
        type: String,
        required: true,
    },
});

documentSchema.index({ appoinmentId: 1, fileName: 1 }, { unique: true });

export default mongoose.model('Document', documentSchema);
