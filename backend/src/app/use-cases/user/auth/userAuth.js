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
exports.getUserById = exports.updateUser = exports.getUserProfile = exports.verifyTokenAndRestPassword = exports.sendResetVerificationCode = exports.authenticateGoogleSignInUser = exports.login = exports.deleteOtp = exports.verifyOtpUser = exports.userRegister = void 0;
const userEntity_1 = __importStar(require("../../../../entities/userEntity"));
const customError_1 = __importDefault(require("../../../../utils/customError"));
const httpStatus_1 = require("../../../../types/httpStatus");
const sendMail_1 = __importDefault(require("../../../../utils/sendMail"));
const userEmail_1 = require("../../../../utils/userEmail");
const userRegister = (user, userRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = user;
    const authenticationMethod = "password";
    //Check the email is already exist
    const isEmailExist = yield userRepository.getUserbyEmail(email);
    if (isEmailExist)
        throw new customError_1.default("Email already exists", httpStatus_1.HttpStatus.BAD_REQUEST);
    const hashedPassword = yield authService.encryptPassword(password);
    const userEntity = (0, userEntity_1.default)(name, email, hashedPassword, authenticationMethod);
    //create a new User 
    const createdUser = yield userRepository.addUser(userEntity);
    const wallet = yield userRepository.addWallet(createdUser.id);
    const OTP = authService.generateOTP(); //generate otp
    const emailSubject = "Account verification";
    (0, sendMail_1.default)(createdUser.email, emailSubject, (0, userEmail_1.otpEmail)(OTP, createdUser.name)); //send otp
    yield userRepository.addOTP(OTP, createdUser.id);
    const accessToken = authService.createTokens(createdUser.id, createdUser.name, createdUser.role);
    return { createdUser, accessToken };
});
exports.userRegister = userRegister;
//verify otp with db otp 
const verifyOtpUser = (userOTP, userId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userOTP)
        throw new customError_1.default("Please provide an OTP", httpStatus_1.HttpStatus.BAD_REQUEST);
    const otpUser = yield userRepository.findOtpUser(userId);
    if (!otpUser)
        throw new customError_1.default("Invalid otp , try resending the otp", httpStatus_1.HttpStatus.BAD_REQUEST);
    if (otpUser.OTP === userOTP) {
        yield userRepository.updateProfile(userId, {
            isVerified: true,
        });
        return true;
    }
    else {
        throw new customError_1.default("Invalid OTP,try again", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
});
exports.verifyOtpUser = verifyOtpUser;
const deleteOtp = (userId, userDbRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const newOtp = authService.generateOTP();
    const deleted = yield userDbRepository.deleteOtpUser(userId); // delete the existing otp user from db
    if (deleted) {
        yield userDbRepository.addOTP(newOtp, userId); // create new otp user
    }
    const user = yield userDbRepository.getUserbyId(userId);
    if (user) {
        const emailSubject = "Account verification , New OTP";
        (0, sendMail_1.default)(user.email, emailSubject, (0, userEmail_1.otpEmail)(newOtp, user.name)); // Sending otp to the user email
    }
});
exports.deleteOtp = deleteOtp;
const login = (user, userDbRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = user;
    const isEmailExist = yield userDbRepository.getUserbyEmail(email);
    if ((isEmailExist === null || isEmailExist === void 0 ? void 0 : isEmailExist.authenticationMethod) === "google") {
        throw new customError_1.default("Only login with google", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    if (!isEmailExist) {
        throw new customError_1.default("Invalid credentials", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    if (isEmailExist === null || isEmailExist === void 0 ? void 0 : isEmailExist.isBlocked) {
        throw new customError_1.default("Account is Blocked ", httpStatus_1.HttpStatus.FORBIDDEN);
    }
    if (!(isEmailExist === null || isEmailExist === void 0 ? void 0 : isEmailExist.isVerified)) {
        throw new customError_1.default("your account is not verified", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    if (!isEmailExist.password) {
        throw new customError_1.default("Invalid Credentials", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const isPasswordMatched = yield authService.comparePassword(password, isEmailExist === null || isEmailExist === void 0 ? void 0 : isEmailExist.password);
    if (!isPasswordMatched) {
        throw new customError_1.default("Invalid credentials", httpStatus_1.HttpStatus.UNAUTHORIZED);
    }
    const accessToken = authService.createTokens(isEmailExist.id, isEmailExist.name, isEmailExist.role);
    return { accessToken, isEmailExist };
});
exports.login = login;
const authenticateGoogleSignInUser = (userData, userDbRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, picture, email_verified } = userData;
    const authenticationMethod = "google";
    const isEmailExist = yield userDbRepository.getUserbyEmail(email);
    if (isEmailExist === null || isEmailExist === void 0 ? void 0 : isEmailExist.isBlocked)
        throw new customError_1.default("Your account is blocked by administrator", httpStatus_1.HttpStatus.FORBIDDEN);
    if (isEmailExist) {
        const accessToken = authService.createTokens(isEmailExist.id, isEmailExist.name, isEmailExist.role);
        return { accessToken, isEmailExist };
    }
    else {
        const googleSignInUser = (0, userEntity_1.googleSignInUserEntity)(name, email, picture, email_verified, authenticationMethod);
        const createdUser = yield userDbRepository.registerGoogleSignedUser(googleSignInUser);
        const userId = createdUser._id;
        const wallet = yield userDbRepository.addWallet(userId);
        const accessToken = authService.createTokens(userId, createdUser.name, createdUser.role);
        return { accessToken, createdUser };
    }
});
exports.authenticateGoogleSignInUser = authenticateGoogleSignInUser;
const sendResetVerificationCode = (email, userDbRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const isEmailExist = yield userDbRepository.getUserbyEmail(email);
    if ((isEmailExist === null || isEmailExist === void 0 ? void 0 : isEmailExist.authenticationMethod) === "google") {
        throw new customError_1.default(`${email} is sign in using google signin method .Do not reset the password `, httpStatus_1.HttpStatus.BAD_REQUEST);
    }
    if (!isEmailExist)
        throw new customError_1.default(`${email} does not exist`, httpStatus_1.HttpStatus.BAD_REQUEST);
    const verificationCode = authService.getRandomString();
    const isUpdated = yield userDbRepository.updateVerificationCode(email, verificationCode);
    (0, sendMail_1.default)(email, "Reset password", (0, userEmail_1.forgotPasswordEmail)(isEmailExist.name, verificationCode));
});
exports.sendResetVerificationCode = sendResetVerificationCode;
const verifyTokenAndRestPassword = (verificationCode, password, userDbRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    if (!verificationCode)
        throw new customError_1.default("Please provide a verification code", httpStatus_1.HttpStatus.BAD_REQUEST);
    const hashedPassword = yield authService.encryptPassword(password);
    const isPasswordUpdated = yield userDbRepository.verifyAndResetPassword(verificationCode, hashedPassword);
    if (!isPasswordUpdated)
        throw new customError_1.default("Invalid token or token expired", httpStatus_1.HttpStatus.BAD_REQUEST);
});
exports.verifyTokenAndRestPassword = verifyTokenAndRestPassword;
const getUserProfile = (userID, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.getUserbyId(userID);
    return user;
});
exports.getUserProfile = getUserProfile;
const updateUser = (userID, updateData, userRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield userRepository.updateProfile(userID, updateData); });
exports.updateUser = updateUser;
const getUserById = (id, userRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield userRepository.getUserbyId(id); });
exports.getUserById = getUserById;
