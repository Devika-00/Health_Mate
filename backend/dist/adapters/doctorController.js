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
const httpStatus_1 = require("../types/httpStatus");
const authDoctor_1 = require("../app/use-cases/doctor/authDoctor");
const timeslot_1 = require("../app/use-cases/doctor/timeslot");
const profile_1 = require("../app/use-cases/doctor/read & Update/profile");
const doctorRead_1 = require("../app/use-cases/doctor/doctorRead");
const adminRead_1 = require("../app/use-cases/Admin/adminRead");
const prescriptionUseCase_1 = require("../app/use-cases/Prescription/prescriptionUseCase");
const adminDepartment_1 = require("../app/use-cases/Admin/adminDepartment");
const doctorController = (authServiceInterface, authServiceImpl, userDbRepository, userRepositoryImpl, doctorDbRepository, doctorDbRepositoryImpl, timeSlotDbRepository, timeSlotDbRepositoryImpl, prescriptionDbRepository, prescriptionDbRepositoryImpl, bookingDbRepository, bookingDbRepositoryImpl, departmentDbRepository, departmentDbRepositoryImpl) => {
    const authService = authServiceInterface(authServiceImpl());
    const dbRepositoryUser = userDbRepository(userRepositoryImpl());
    const dbRepositoryDoctor = doctorDbRepository(doctorDbRepositoryImpl());
    const dbPrescriptionRepository = prescriptionDbRepository(prescriptionDbRepositoryImpl());
    const dbTimeSlotRepository = timeSlotDbRepository(timeSlotDbRepositoryImpl());
    const dbBookingRepository = bookingDbRepository(bookingDbRepositoryImpl());
    const dbDepartmentRepository = departmentDbRepository(departmentDbRepositoryImpl());
    // doctor signup method POST
    const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doctordata = req.body;
            const registerDoctor = yield (0, authDoctor_1.addNewDoctor)(doctordata, dbRepositoryDoctor, authService);
            if (registerDoctor) {
                return res.status(httpStatus_1.HttpStatus.OK).json({
                    success: true,
                    message: "Registration success, please verify your email that we sent to your mail"
                });
            }
        }
        catch (error) {
            next(error);
        }
        ;
    });
    //verify account of doctor
    const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { token } = req.params;
            const verifying = yield (0, authDoctor_1.verifyAccount)(token, dbRepositoryDoctor);
            if (verifying)
                return res.status(httpStatus_1.HttpStatus.OK).json({
                    success: true,
                    message: "Account is verified, you can login.",
                });
        }
        catch (error) {
            next(error);
        }
    });
    // login doctor method POST
    const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            // Assuming doctorLogin, dbRepositoryDoctor, and authService are defined elsewhere
            const { accessToken, isEmailExist } = yield (0, authDoctor_1.doctorLogin)(email, password, dbRepositoryDoctor, authService);
            return res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Login successful",
                doctor: isEmailExist,
                accessToken: accessToken,
            });
        }
        catch (error) {
            next(error);
        }
    });
    const googleSignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doctorData = req.body.doctor;
            const { accessToken, isEmailExist, createdUser } = yield (0, authDoctor_1.authenticateGoogleSignInUser)(doctorData, dbRepositoryDoctor, authService);
            const user = isEmailExist ? isEmailExist : createdUser;
            res.status(httpStatus_1.HttpStatus.OK).json({ message: "login success", user, accessToken: accessToken, });
        }
        catch (error) {
            next(error);
        }
    });
    /* method get doctor details */
    const userDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield (0, adminRead_1.getSingleUser)(id, dbRepositoryUser);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, user });
        }
        catch (error) {
            next(error);
        }
    });
    /**method get retrieve doctor profile */
    const doctorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doctorId = req.doctor;
            const doctor = yield (0, profile_1.getDoctorProfile)(doctorId, dbRepositoryDoctor);
            res.status(200).json({ success: true, doctor });
        }
        catch (error) {
            next(error);
        }
    });
    /**
   * * METHOD :PATCH
   * * update doctor profile
   */
    const updateDoctorInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doctorId = req.doctor;
            const updateData = req.body;
            const doctor = yield (0, profile_1.updateDoctor)(doctorId, updateData, dbRepositoryDoctor);
            res
                .status(200)
                .json({ success: true, doctor, message: "Profile updated successfully" });
        }
        catch (error) {
            next(error);
        }
    });
    /**method get retrieve doctor status */
    const doctorStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doctorId = req.doctor;
            const doctor = yield (0, profile_1.getDoctorProfile)(doctorId, dbRepositoryDoctor);
            res.status(200).json({ success: true, doctor });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * * METHOD :GET
     * return all time slot to the doctor
     */
    const getTimeSlots = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doctorId = req.doctor;
            const timeSlots = yield (0, timeslot_1.getTimeSlotsByDoctorId)(doctorId, dbTimeSlotRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({ success: true, timeSlots });
        }
        catch (error) {
            next(error);
        }
    });
    const getPatientList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const patients = yield (0, doctorRead_1.getPatients)(dbBookingRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, patients });
        }
        catch (error) {
            next(error);
        }
    });
    const getPatientDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const patient = yield (0, doctorRead_1.getPatientFullDetails)(id, dbBookingRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, patient });
        }
        catch (error) {
            next(error);
        }
    });
    /**method get doctor details */
    const getDoctorDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const doctor = yield (0, profile_1.getDoctorProfile)(id, dbRepositoryDoctor);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, doctor });
        }
        catch (error) {
            next(error);
        }
    });
    /*method put doctor rejected */
    const getDoctorRejected = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const doctor = yield (0, profile_1.DoctorRejected)(id, dbRepositoryDoctor);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, doctor });
        }
        catch (error) {
            next(error);
        }
    });
    /* add slot Method post*/
    const addSlot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { doctorId, startDate, endDate, slotTime } = req.body;
            const data = { doctorId, startDate, endDate, slotTime };
            const response = yield (0, timeslot_1.addTimeSlot)(data, dbTimeSlotRepository);
            console.log(response, "ooooooooo");
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "slots added successfully",
                response,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /* Method Delete - slot delete*/
    const deleteSlot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield (0, timeslot_1.deleteTimeSlot)(id, dbTimeSlotRepository);
            res
                .status(httpStatus_1.HttpStatus.OK)
                .json({ success: true, message: "Slot deleted successfully" });
        }
        catch (error) {
            next(error);
        }
    });
    /* method post - add prescription */
    const addPrescription = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { appointmentId, prescriptionDate, medicines } = req.body;
            const data = { appointmentId, prescriptionDate, medicines };
            const response = yield (0, prescriptionUseCase_1.addPrescriptionToUser)(data, dbPrescriptionRepository);
            res
                .status(httpStatus_1.HttpStatus.OK)
                .json({ success: true, message: "add Prescription successfully", response });
        }
        catch (error) {
            next(error);
        }
    });
    /**get Method fetch Prescription */
    const fetchPrescription = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = id;
            const response = yield (0, prescriptionUseCase_1.fetchPrescriptionForDoctor)(data, dbPrescriptionRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({ sucess: true, response });
        }
        catch (error) {
            next(error);
        }
    });
    /**method delete - delete prescription */
    const deletePrescription = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const prescriptionId = req.params.id;
            const response = yield (0, prescriptionUseCase_1.deletePrescriptionData)(prescriptionId, dbPrescriptionRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({ sucess: true, response });
        }
        catch (error) {
            next(error);
        }
    });
    /**method get receiver details */
    const receiverDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const doctor = yield (0, profile_1.getDoctorProfile)(id, dbRepositoryDoctor);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, doctor });
        }
        catch (error) {
            next(error);
        }
    });
    /**method get - fetch departments */
    const getAllDepartments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allDepartment = yield (0, adminDepartment_1.Department)(dbDepartmentRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, allDepartment, message: "Department added Successfully" });
        }
        catch (error) {
            next(error);
        }
    });
    return {
        signup,
        verifyToken,
        login,
        doctorProfile,
        updateDoctorInfo,
        googleSignIn,
        doctorStatus,
        getTimeSlots,
        // removeTimeSlot,
        getPatientList,
        getPatientDetails,
        getDoctorDetails,
        getDoctorRejected,
        addSlot,
        deleteSlot,
        userDetails,
        addPrescription,
        fetchPrescription,
        deletePrescription,
        receiverDetails,
        getAllDepartments,
    };
};
exports.default = doctorController;
