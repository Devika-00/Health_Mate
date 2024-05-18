import mongoose, { Schema } from 'mongoose';

const prescriptionSchema = new mongoose.Schema({

    doctorId: { type: Schema.Types.ObjectId, required: true, ref: "Doctor" },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    appointmentId: { type: Schema.Types.ObjectId, ref: "Booking" }, 
    prescriptionDate: {
        type: Date,
        default: Date.now,
    },
    medicines: [
        {
            name: {
                type: String,
                required: true,
            },
            dosage: {
                type: String,
                required: true,
            },
            instructions: {
                type: String,
                default: "",
            },
        },
    ],
});

export default mongoose.model("Prescription",prescriptionSchema);