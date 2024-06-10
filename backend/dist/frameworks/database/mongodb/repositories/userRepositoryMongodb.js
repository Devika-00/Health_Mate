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
exports.userRepositoryMongodb = void 0;
const OTPmodel_1 = __importDefault(require("../models/OTPmodel"));
const transations_1 = __importDefault(require("../models/transations"));
const user_1 = __importDefault(require("../models/user"));
const wallet_1 = __importDefault(require("../models/wallet"));
const userRepositoryMongodb = () => {
    const getUserbyEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ email });
        return user;
    });
    const getUserbyId = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield user_1.default.findById(id); });
    const updateUserBlock = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.findByIdAndUpdate(id, { isBlocked: status });
    });
    const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = new user_1.default({
            name: user.name(),
            email: user.getEmail(),
            password: user.getPassword(),
            authenticationMethod: user.getAuthenticationMethod(),
        });
        yield newUser.save();
        return newUser;
    });
    const addWallet = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield wallet_1.default.create({ userId }); });
    const AddOTP = (OTP, userId) => __awaiter(void 0, void 0, void 0, function* () {
        yield OTPmodel_1.default.create({ OTP, userId });
    });
    const findOtpUser = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield OTPmodel_1.default.findOne({ userId: userId }); });
    const deleteOtpUser = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield OTPmodel_1.default.deleteOne({ userId }); });
    const getWalletUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield wallet_1.default.findOne({ userId: userId });
        return response;
    });
    const updateUserInfo = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () { return yield user_1.default.findByIdAndUpdate(id, updateData, { new: true }); });
    const updateVerificationCode = (email, code) => __awaiter(void 0, void 0, void 0, function* () { return yield user_1.default.findOneAndUpdate({ email }, { verificationCode: code }); });
    const findVerificationCodeAndUpdate = (code, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.default.findOneAndUpdate({ verificationCode: code }, { password: newPassword, verificationCode: null }, { upsert: true });
    });
    const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield user_1.default.find({ isVerified: true }); });
    const registerGoogleSignedUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        return yield user_1.default.create({
            name: user.name(),
            email: user.email(),
            profilePicture: user.picture(),
            isVerified: user.email_verified(),
            authenticationMethod: user.authenticationMethod(),
        });
    });
    const getAllTransaction = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const transactions = yield transations_1.default.find({ userId: userId });
        return transactions;
    });
    return {
        getUserbyEmail,
        getUserbyId,
        addUser,
        AddOTP,
        findOtpUser,
        updateUserInfo,
        deleteOtpUser,
        updateVerificationCode,
        findVerificationCodeAndUpdate,
        getAllUsers,
        registerGoogleSignedUser,
        updateUserBlock,
        addWallet,
        getWalletUser,
        getAllTransaction,
    };
};
exports.userRepositoryMongodb = userRepositoryMongodb;
