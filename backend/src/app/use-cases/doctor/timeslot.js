"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateSlotsByDoctorId = exports.deleteTimeSlot = exports.getTimeSlotsByDoctorId = exports.getAllTimeSlotsByDoctorId = exports.addTimeSlot = void 0;
const addTimeSlot = (data, dbTimeSlotRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctorId, startDate, endDate, slotTime } = data;
    // Check if slot with the same doctor, startDate, and endDate already exists
    const existingSlot = yield dbTimeSlotRepository.exsitingSlotAvailables(doctorId, startDate, endDate);
    if (existingSlot) {
        // Update the slotTime array if slot already exists
        existingSlot.slotTime = [...new Set([...existingSlot.slotTime, ...slotTime])];
        yield existingSlot.save();
        return { status: true, message: 'Slots updated successfully' };
    }
    else {
        const newSlot = yield dbTimeSlotRepository.addtimeSlot(doctorId, startDate, endDate, slotTime);
        return newSlot;
    }
});
exports.addTimeSlot = addTimeSlot;
const getAllTimeSlotsByDoctorId = (doctorId, date, dbTimeSlotRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield dbTimeSlotRepository.getAllTimeSlotsBydate(doctorId, date); });
exports.getAllTimeSlotsByDoctorId = getAllTimeSlotsByDoctorId;
const getTimeSlotsByDoctorId = (doctorId, dbTimeSlotRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield dbTimeSlotRepository.getAllTimeSlots(doctorId); });
exports.getTimeSlotsByDoctorId = getTimeSlotsByDoctorId;
const deleteTimeSlot = (timeSlotId, dbTimeSlotRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield dbTimeSlotRepository.removeTimeSlotbyId(timeSlotId); });
exports.deleteTimeSlot = deleteTimeSlot;
const getDateSlotsByDoctorId = (doctorId, dbTimeSlotRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield dbTimeSlotRepository.getAllDateSlots(doctorId); });
exports.getDateSlotsByDoctorId = getDateSlotsByDoctorId;
