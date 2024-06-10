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
const adminAuth_1 = require("../app/use-cases/Admin/adminAuth");
const adminRead_1 = require("../app/use-cases/Admin/adminRead");
const adminUpdate_1 = require("../app/use-cases/Admin/adminUpdate");
const adminDepartment_1 = require("../app/use-cases/Admin/adminDepartment");
// adminAuthController
exports.default = (authServiceInterface, authServiceImpl, userDbRepository, userDbRepositoryImpl, doctorDbRepository, doctorDbRepositoryImpl, departmentDbRepository, departmentDbRepositoryImpl) => {
    const dbUserRepository = userDbRepository(userDbRepositoryImpl());
    const dbDoctorRepository = doctorDbRepository(doctorDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    const dbDepartmentRepository = departmentDbRepository(departmentDbRepositoryImpl());
    const adminLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const accessToken = yield (0, adminAuth_1.loginAdmin)(email, password, authService);
            return res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Admin login success",
                accessToken: accessToken,
                admin: { name: "Admin User", role: "admin" },
            });
        }
        catch (error) {
            next(error);
        }
    });
    /*
       * METHOD:GET
       * Retrieve all the users from db
       */
    const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield (0, adminRead_1.getUsers)(dbUserRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, users });
        }
        catch (error) {
            next(error);
        }
    });
    /*
       * METHOD:GET
       * Retrieve all the doctors from db
       */
    const getAllTheDoctors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doctors = yield (0, adminRead_1.getAllDoctors)(dbDoctorRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, doctors });
        }
        catch (error) {
            next(error);
        }
    });
    /**method get fetch all appoinments */
    const getAllAppoinments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const appoinments = yield (0, adminRead_1.getAllTheAppoinments)(dbDoctorRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, appoinments });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD:PATCH
     * Block or Unblock user
     */
    const userBlock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const updatedUser = yield (0, adminUpdate_1.blockUser)(id, dbUserRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "User block status updated successfully",
                user: updatedUser,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD:PATCH
     * Block or Unblock user
     */
    const doctorBlock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const updatedDoctor = yield (0, adminUpdate_1.blockDoctor)(id, dbDoctorRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "doctor block status updated successfully",
                doctor: updatedDoctor
            });
        }
        catch (error) {
            next(error);
        }
    });
    /* method get doctor details */
    const doctorDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const doctor = yield (0, adminRead_1.getSingleDoctor)(id, dbDoctorRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, doctor });
        }
        catch (error) {
            next(error);
        }
    });
    /* method patch verify in admin */
    const VerifyDoctor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const doctor = yield (0, adminRead_1.getDoctor)(id, status, dbDoctorRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, doctor, message: "Verified Successfully" });
        }
        catch (error) {
            next(error);
        }
    });
    /* method patch rejection in admin */
    const rejectionDoctor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const { reason } = req.body;
            const doctor = yield (0, adminRead_1.getDoctorRejected)(id, status, reason, dbDoctorRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, doctor, message: "Verified Successfully" });
        }
        catch (error) {
            next(error);
        }
    });
    /**method post - Add Department */
    const addDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { departmentName, isListed } = req.body;
            const department = yield (0, adminDepartment_1.addOneDepartment)(departmentName, isListed, dbDepartmentRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, department, message: "Department added Successfully" });
        }
        catch (error) {
            next(error);
        }
    });
    /**method get -  Department */
    const getAllDepartments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allDepartment = yield (0, adminDepartment_1.Department)(dbDepartmentRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, allDepartment, message: "Department added Successfully" });
        }
        catch (error) {
            next(error);
        }
    });
    /**method put - edit department */
    const updateDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { departmentName } = req.body;
            const { id } = req.params;
            const update = yield (0, adminDepartment_1.departmentUpdate)(departmentName, id, dbDepartmentRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, update, message: "update Successfully" });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD:PATCH
     * Block or Unblock user
     */
    const unlistDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const updatedDepartment = yield (0, adminDepartment_1.departmentUnlist)(id, dbDepartmentRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "updated successfully",
                department: updatedDepartment,
            });
        }
        catch (error) {
            next(error);
        }
    });
    return {
        adminLogin,
        getAllUser,
        userBlock,
        getAllTheDoctors,
        doctorBlock,
        doctorDetails,
        VerifyDoctor,
        rejectionDoctor,
        getAllAppoinments,
        addDepartment,
        getAllDepartments,
        updateDepartment,
        unlistDepartment,
    };
};
