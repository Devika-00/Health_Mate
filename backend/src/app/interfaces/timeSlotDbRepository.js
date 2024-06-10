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
exports.timeSlotDbRepository = void 0;
const timeSlotDbRepository = (repository) => {
    const addtimeSlot = (doctorId, startDate, endDate, slotTime) => __awaiter(void 0, void 0, void 0, function* () {
        yield repository.addTimeSlots(doctorId, startDate, endDate, slotTime);
    });
    const isTimeSlotExist = (doctorId, time, date) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getSlotByTime(doctorId, time); });
    const exsitingSlotAvailables = (doctorId, startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.existingSlotAvailable(doctorId, startDate, endDate);
    });
    const getAllTimeSlotsBydate = (doctorId, date) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllTimeSlotsByDate(doctorId, date); });
    const getAllTimeSlots = (doctorId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllTimeSlots(doctorId); });
    const getAllDateSlots = (doctorId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllDateSlots(doctorId); });
    const removeTimeSlotbyId = (timeSlotId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.removeTimeSlotbyId(timeSlotId); });
    const getAllTimeSlot = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllTimeSlot(); });
    return {
        addtimeSlot,
        isTimeSlotExist,
        getAllTimeSlots,
        removeTimeSlotbyId,
        getAllDateSlots,
        exsitingSlotAvailables,
        getAllTimeSlotsBydate,
        getAllTimeSlot,
    };
};
exports.timeSlotDbRepository = timeSlotDbRepository;
