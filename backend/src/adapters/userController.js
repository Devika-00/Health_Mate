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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_1 = require("../app/use-cases/user/auth/userAuth");
const profile_1 = require("../app/use-cases/user/read & update/profile");
const httpStatus_1 = require("../types/httpStatus");
const adminRead_1 = require("../app/use-cases/Admin/adminRead");
const timeslot_1 = require("../app/use-cases/doctor/timeslot");
const get_and_update_1 = require("../app/use-cases/user/timeslots/get and update ");
const prescriptionUseCase_1 = require("../app/use-cases/Prescription/prescriptionUseCase");
const adminDepartment_1 = require("../app/use-cases/Admin/adminDepartment");
const userController = (authServiceInterface, authServiceImpl, userDbRepository, userRepositoryImpl, doctorDbRepository, doctorDbRepositoryImpl, timeSlotDbRepository, timeSlotDbRepositoryImpl, prescriptionDbRepository, prescriptionDbRepositoryImpl, departmentDbRepository, departmentDbRepositoryImpl) => {
    const dbRepositoryUser = userDbRepository(userRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    const dbDoctorRepository = doctorDbRepository(doctorDbRepositoryImpl());
    const dbPrescriptionRepository = prescriptionDbRepository(prescriptionDbRepositoryImpl());
    const dbTimeSlotRepository = timeSlotDbRepository(timeSlotDbRepositoryImpl());
    const dbDepartmentRepository = departmentDbRepository(departmentDbRepositoryImpl());
    // Register User POST - Method
    const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = req.body;
            const { createdUser, accessToken } = yield (0, userAuth_1.userRegister)(user, dbRepositoryUser, authService);
            res.json({
                message: "User registration successful,please verify email",
                newUser: createdUser,
                accessToken: accessToken,
            });
        }
        catch (error) {
            next(error);
        }
    });
    // Verify Otp Method POSt
    const verifyOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { otp, userId } = req.body;
            const isVerified = yield (0, userAuth_1.verifyOtpUser)(otp, userId, dbRepositoryUser);
            if (isVerified) {
                return res.status(httpStatus_1.HttpStatus.OK)
                    .json({ message: "User account verified, please login" });
            }
        }
        catch (error) {
            next(error);
        }
    });
    //Resend Otp method : POST
    const resendOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = req.body;
            yield (0, userAuth_1.deleteOtp)(userId, dbRepositoryUser, authService);
            res.json({ message: "New otp sent to mail" });
        }
        catch (error) {
            next(error);
        }
    });
    // user login method: Post
    const userLogin = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { accessToken, isEmailExist } = yield (0, userAuth_1.login)(req.body, dbRepositoryUser, authService);
            res
                .status(httpStatus_1.HttpStatus.OK)
                .json({ message: "login success", user: isEmailExist,
                accessToken: accessToken,
            });
        }
        catch (error) {
            next(error);
        }
    }));
    /**
** method : POST
** Google Signin with user credentials
*/
    const googleSignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userData = req.body.user;
            const { accessToken, isEmailExist, createdUser } = yield (0, userAuth_1.authenticateGoogleSignInUser)(userData, dbRepositoryUser, authService);
            const user = isEmailExist ? isEmailExist : createdUser;
            res.status(httpStatus_1.HttpStatus.OK).json({ message: "login success", user, accessToken: accessToken, });
        }
        catch (error) {
            next(error);
        }
    });
    // forgot password method post
    const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            yield (0, userAuth_1.sendResetVerificationCode)(email, dbRepositoryUser, authService);
            return res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Reset password code sent to your mail",
            });
        }
        catch (error) {
            next(error);
        }
    });
    /** METHOD:POST reset password*/
    const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { password } = req.body;
            const { token } = req.params;
            yield (0, userAuth_1.verifyTokenAndRestPassword)(token, password, dbRepositoryUser, authService);
            return res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Reset password success,you can login with your new password",
            });
        }
        catch (error) {
            next(error);
        }
    });
    /**
    * * METHOD :GET
    * * Retrieve  user profile
    */
    const userProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user;
            const user = yield (0, profile_1.getUserProfile)(userId, dbRepositoryUser);
            res.status(200).json({ success: true, user });
        }
        catch (error) {
            next(error);
        }
    });
    /**
       * * METHOD :GET
       * * Retrieve  user wallet
       */
    const getWallet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const getWallet = yield (0, profile_1.getWalletUser)(id, dbRepositoryUser);
            res.status(200).json({ success: true, getWallet });
        }
        catch (error) {
            next(error);
        }
    });
    /**Method Get fetch transactions */
    const getTransactions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user;
            const transaction = yield (0, profile_1.WalletTransactions)(userId, dbRepositoryUser);
            res.status(200).json({
                success: true,
                transaction,
                message: "Transactions fetched successfully",
            });
        }
        catch (error) {
            next(error);
        }
    });
    /**
     * * METHOD :PATCH
     * * update user profile
     */
    const updateUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user;
            const updateData = req.body;
            const user = yield (0, profile_1.updateUser)(userId, updateData, dbRepositoryUser);
            res
                .status(200)
                .json({ success: true, user, message: "Profile updated successfully" });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD:GET
     * Retrieve all the doctors from db
     */
    const doctorPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { searchQuery, department, selectedDate, selectedTimeSlot } = req.query;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 8;
            const searchQueryStr = searchQuery;
            const departmentStr = department;
            const selectedDateStr = selectedDate;
            const selectedTimeSlotStr = selectedTimeSlot;
            const doctors = yield (0, adminRead_1.getDoctors)({
                searchQuery: searchQueryStr,
                department: departmentStr,
                selectedDate: selectedDateStr,
                selectedTimeSlot: selectedTimeSlotStr,
                page,
                limit,
            }, dbDoctorRepository);
            return res.status(200).json(Object.assign({ success: true }, doctors));
        }
        catch (error) {
            next(error);
        }
    });
    /*
      * METHOD:GET
      * Retrieve all the doctors from db
      */
    const getAllTimeSlots = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const timeslots = yield (0, get_and_update_1.getAllTimeSlot)(dbTimeSlotRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, timeslots });
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
    /**get time slot by doctorId GET method*/
    const getTimeslots = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { date } = req.query;
            const timeSlots = yield (0, timeslot_1.getAllTimeSlotsByDoctorId)(id, date, dbTimeSlotRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({ success: true, timeSlots });
        }
        catch (error) {
            next(error);
        }
    });
    /**get time slot by doctorId GET method*/
    const getDateSlots = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const dateSlots = yield (0, timeslot_1.getDateSlotsByDoctorId)(id, dbTimeSlotRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({ success: true, dateSlots });
        }
        catch (error) {
            next(error);
        }
    });
    /**get Method fetch Prescription */
    const fetchPrescription = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { appoinmentId } = req.body;
            const data = { appoinmentId };
            const response = yield (0, prescriptionUseCase_1.fetchPrescriptionUsecase)(data, dbPrescriptionRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({ sucess: true, response });
        }
        catch (error) {
            next(error);
        }
    });
    /**post method lab record upload */
    const labRecords = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { documents } = req.body;
            const { id } = req.body;
            const data = documents;
            const appoinmentId = id;
            const response = yield (0, prescriptionUseCase_1.uploadLabDocuments)(appoinmentId, data, dbPrescriptionRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({ sucess: true, response });
        }
        catch (error) {
            next(error);
        }
    });
    /**get lab records method get  */
    const fetchDocuments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const documents = yield (0, prescriptionUseCase_1.getDocuments)(id, dbPrescriptionRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({ success: true, documents });
        }
        catch (error) {
            next(error);
        }
    });
    /**delete document method delete */
    const deleteDocument = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const response = yield (0, prescriptionUseCase_1.deleteSingleDocument)(id, dbPrescriptionRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({ success: true, response });
        }
        catch (error) {
            next(error);
        }
    });
    /**method get - Add Department */
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
        registerUser,
        verifyOtp,
        userLogin,
        resendOtp,
        forgotPassword,
        resetPassword,
        updateUserInfo,
        userProfile,
        googleSignIn,
        doctorPage,
        doctorDetails,
        getTimeslots,
        getDateSlots,
        getAllTimeSlots,
        fetchPrescription,
        labRecords,
        fetchDocuments,
        deleteDocument,
        getWallet,
        getTransactions,
        getAllDepartments,
    };
};
exports.default = userController;
