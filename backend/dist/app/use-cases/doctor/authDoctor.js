"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getDoctorById = exports.getDoctorProfile = exports.authenticateGoogleSignInUser = exports.doctorLogin = exports.verifyAccount = exports.addNewDoctor = void 0;
const doctorEntity_1 = __importStar(require("../../../entities/doctorEntity"));
const httpStatus_1 = require("../../../types/httpStatus");
const customError_1 = __importDefault(require("../../../utils/customError"));
const sendMail_1 = __importDefault(require("../../../utils/sendMail"));
const doctorVerifyEmailPage_1 = require("../../../utils/doctorVerifyEmailPage");
//register new doctor       
const addNewDoctor = (doctorData, doctorRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctorName, email, password, phoneNumber, department, consultationType, education, description, experience, lisenceCertificate, rejectedReason } = doctorData;
    const isEmailExist = yield doctorRepository.getDoctorByemail(email);
    if (isEmailExist)
        throw new customError_1.default("Email already exists", httpStatus_1.HttpStatus.BAD_REQUEST);
    const hashedPassword = yield authService.encryptPassword(password);
    const verificationToken = authService.getRandomString();
    const doctor = (0, doctorEntity_1.default)(doctorName, email, hashedPassword, verificationToken, phoneNumber, department, consultationType, education, description, experience, rejectedReason, lisenceCertificate);
    const createdDoctor = yield doctorRepository.addDoctor(doctor);
    //   sent verification mail to restaurant email address
    if (createdDoctor) {
        const emailSubject = "Doctor verification ";
        (0, sendMail_1.default)(email, emailSubject, (0, doctorVerifyEmailPage_1.doctorVerifyEmailPage)(doctorName, verificationToken));
    }
    return createdDoctor;
});
exports.addNewDoctor = addNewDoctor;
// verify doctor 
const verifyAccount = (token, doctorRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const updateVerification = yield doctorRepository.verifyDoctor(token);
    if (!updateVerification)
        throw new customError_1.default("Invalid token", httpStatus_1.HttpStatus.BAD_REQUEST);
    return updateVerification;
});
exports.verifyAccount = verifyAccount;
const doctorLogin = (email, password, doctorRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const isEmailExist = yield doctorRepository.getDoctorByemail(email);
    if (!isEmailExist)
        throw new customError_1.default("Invalid credentials", httpStatus_1.HttpStatus.UNAUTHORIZED);
    if (isEmailExist === null || isEmailExist === void 0 ? void 0 : isEmailExist.isBlocked) {
        throw new customError_1.default("Account is Blocked ", httpStatus_1.HttpStatus.FORBIDDEN);
    }
    if (!isEmailExist.isVerified)
        throw new customError_1.default("Please verify your email", httpStatus_1.HttpStatus.UNAUTHORIZED);
    const message = "Your account has not been approved by the admin yet. Please wait for approval.";
    const isPasswordMatch = yield authService.comparePassword(password, isEmailExist.password);
    if (!isPasswordMatch)
        throw new customError_1.default("Invalid credentials", httpStatus_1.HttpStatus.BAD_REQUEST);
    const accessToken = authService.doctorCreateTokens(isEmailExist.id, isEmailExist.doctorName, isEmailExist.role);
    return { accessToken, isEmailExist };
});
exports.doctorLogin = doctorLogin;
const authenticateGoogleSignInUser = (doctorData, doctorDbRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, picture, email_verified } = doctorData;
    const isEmailExist = yield doctorDbRepository.getDoctorByemail(email);
    if (isEmailExist === null || isEmailExist === void 0 ? void 0 : isEmailExist.isBlocked)
        throw new customError_1.default("Your account is blocked by administrator", httpStatus_1.HttpStatus.FORBIDDEN);
    if (isEmailExist) {
        const accessToken = authService.createTokens(isEmailExist.id, isEmailExist.doctorName, isEmailExist.role);
        return { accessToken, isEmailExist };
    }
    else {
        const googleSignInUser = (0, doctorEntity_1.googleSignInUserEntity)(name, email, picture, email_verified);
        const createdUser = yield doctorDbRepository.registerGoogleSignedDoctor(googleSignInUser);
        const userId = createdUser._id;
        const accessToken = authService.createTokens(userId, createdUser.doctorName, createdUser.role);
        return { accessToken, createdUser };
    }
});
exports.authenticateGoogleSignInUser = authenticateGoogleSignInUser;
const getDoctorProfile = (doctorId, doctorRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const doctor = yield doctorRepository.getDoctorById(doctorId);
    return doctor;
});
exports.getDoctorProfile = getDoctorProfile;
const getDoctorById = (id, doctorRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield doctorRepository.getDoctorById(id); });
exports.getDoctorById = getDoctorById;
