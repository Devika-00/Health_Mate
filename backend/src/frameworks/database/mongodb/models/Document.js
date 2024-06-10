"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const documentSchema = new mongoose_1.default.Schema({
    appoinmentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.default = mongoose_1.default.model('Document', documentSchema);
