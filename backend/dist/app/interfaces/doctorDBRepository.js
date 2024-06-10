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
exports.doctorDbRepository = void 0;
const doctorDbRepository = (repository) => {
    const getDoctorById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getDoctorById(id); });
    const getDoctorByIdUpdate = (id, status) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getDoctorByIdUpdate(id, status); });
    const getDoctorByIdUpdateRejected = (id, status, reason) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getDoctorByIdUpdateRejected(id, status, reason); });
    const updateDoctorBlock = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
        yield repository.updateDoctorBlock(id, status);
    });
    // Update the function signature to use the defined type
    const getFilteredDoctors = (_a) => __awaiter(void 0, [_a], void 0, function* ({ searchQuery, department, selectedDate, selectedTimeSlot, page, limit, }) {
        return yield repository.getFilteredDoctors({
            searchQuery,
            department,
            selectedDate,
            selectedTimeSlot,
            page,
            limit,
        });
    });
    const getDoctorByemail = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getDoctorByemail(email); });
    const addDoctor = (doctorData) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addDoctor(doctorData); });
    const verifyDoctor = (token) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.verifyDoctor(token); });
    const updateProfile = (doctorID, doctorData) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updateDoctorInfo(doctorID, doctorData); });
    const getAllDoctors = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllDoctors(); });
    const getAllAppoinments = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllAppoinments(); });
    const getRejectedDoctorById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getRejectedDoctorById(id); });
    const registerGoogleSignedDoctor = (doctor) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.registerGoogleSignedDoctor(doctor); });
    return {
        getDoctorById,
        getDoctorByemail,
        addDoctor,
        verifyDoctor,
        updateProfile,
        registerGoogleSignedDoctor,
        getAllDoctors,
        updateDoctorBlock,
        getDoctorByIdUpdate,
        getDoctorByIdUpdateRejected,
        getRejectedDoctorById,
        getFilteredDoctors,
        getAllAppoinments,
    };
};
exports.doctorDbRepository = doctorDbRepository;
