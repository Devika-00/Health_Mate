"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const departmentSchema = new mongoose_1.default.Schema({
    departmentName: {
        type: String,
        required: true,
        unique: true,
    },
    isListed: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
// Export the model
exports.default = mongoose_1.default.model('Department', departmentSchema);
