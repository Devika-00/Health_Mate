"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const doctorSchema = new mongoose_1.default.Schema({
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
    phoneNumber: {
        type: String,
    },
    department: {
        type: String,
    },
    role: {
        type: String,
        enum: ["doctor"],
        default: "doctor",
    },
    education: {
        type: String,
    },
    experience: {
        type: String,
    },
    description: {
        type: String,
    },
    lisenceCertificate: {
        type: String,
    },
    gender: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: "pending",
    },
    rejectedReason: {
        type: String,
        default: "",
    },
    consultationType: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    verificationToken: String,
}, { timestamps: true });
exports.default = mongoose_1.default.model("Doctor", doctorSchema);
