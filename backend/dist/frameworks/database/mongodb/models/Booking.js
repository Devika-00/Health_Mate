"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    doctorId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: "Doctor",
    },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    patientName: {
        type: String,
    },
    patientAge: {
        type: String,
    },
    patientNumber: {
        tpe: String,
    },
    patientGender: {
        type: String,
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
    appoinmentStatus: {
        type: String,
        default: "Booked"
    },
    appoinmentCancelReason: {
        type: String,
    },
    date: {
        type: String,
        require: true,
    },
    timeSlot: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("Booking", bookingSchema);
