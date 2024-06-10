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
exports.DoctorRejected = exports.updateDoctor = exports.getDoctorProfile = void 0;
const getDoctorProfile = (doctorID, DoctorRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const doctor = yield DoctorRepository.getDoctorById(doctorID);
    return doctor;
});
exports.getDoctorProfile = getDoctorProfile;
const updateDoctor = (doctorID, updateData, doctorRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield doctorRepository.updateProfile(doctorID, updateData); });
exports.updateDoctor = updateDoctor;
const DoctorRejected = (doctorID, DoctorRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const doctor = yield DoctorRepository.getRejectedDoctorById(doctorID);
    return doctor;
});
exports.DoctorRejected = DoctorRejected;
