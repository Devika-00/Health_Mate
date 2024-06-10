"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const timeSlotSchema = new mongoose_1.default.Schema({
    doctorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.default = mongoose_1.default.model('TimeSlot', timeSlotSchema);
