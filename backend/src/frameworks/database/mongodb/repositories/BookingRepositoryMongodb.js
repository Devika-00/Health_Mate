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
exports.bookingRepositoryMongodb = void 0;
const Booking_1 = __importDefault(require("../models/Booking"));
const wallet_1 = __importDefault(require("../models/wallet"));
const transations_1 = __importDefault(require("../models/transations"));
const bookingRepositoryMongodb = () => {
    const createBooking = (data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Booking_1.default.create({
            userId: data.getUserId(),
            doctorId: data.getDoctorId(),
            patientName: data.getPatientName(),
            patientAge: data.getPatientAge(),
            patientNumber: data.getPatientNumber(),
            patientGender: data.getPatientGender(),
            consultationType: data.getConsultationType(),
            fee: data.getFee(),
            paymentStatus: data.getPaymentStatus(),
            appoinmentStatus: data.getAppoinmentStatus(),
            appoinmentCancelReason: data.getAppoinmentCancelReason(),
            date: data.getDate(),
            timeSlot: data.getTimeSlot(),
        });
    });
    const getAllPatients = () => __awaiter(void 0, void 0, void 0, function* () { return yield Booking_1.default.find(); });
    const deleteSlot = (doctorId, date, timeSlot) => __awaiter(void 0, void 0, void 0, function* () { return yield Booking_1.default.findOne({ doctorId: doctorId, timeSlot: timeSlot, date: date, }); });
    const getSinglePatient = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield Booking_1.default.findById(id); });
    const updateBooking = (bookingId, updatingData) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Booking_1.default.findOneAndUpdate({ bookingId }, { paymentStatus: "Paid" });
    });
    const getBookingById = (bookingId) => __awaiter(void 0, void 0, void 0, function* () { return yield Booking_1.default.findById({ _id: bookingId }); });
    const getAllBookingByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield Booking_1.default.find({ userId: userId }); });
    const getAllBookingByDoctorId = (doctorId) => __awaiter(void 0, void 0, void 0, function* () { return yield Booking_1.default.find({ doctorId: doctorId }); });
    const changeBookingStatus = (appoinmentStatus, cancelReason, id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Booking_1.default.findByIdAndUpdate(id, { appoinmentStatus: appoinmentStatus, appoinmentCancelReason: cancelReason });
        }
        catch (error) {
            console.error('Error updating booking status:', error);
        }
    });
    const changeBookingstatusPayment = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Booking_1.default.findByIdAndUpdate(id, { paymentStatus: "Success" });
    });
    const changeWalletMoney = (fee, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const walletData = yield wallet_1.default.findOne({ userId: userId });
        if (!walletData) {
            throw new Error('Wallet not found for the user');
        }
        // Calculate the new balance
        //@ts-ignore
        const newBalance = walletData.balance + fee;
        // Update the wallet with the new balance
        //@ts-ignore
        walletData === null || walletData === void 0 ? void 0 : walletData.balance = newBalance;
        //@ts-ignore
        yield walletData.save();
    });
    const changeTheWallet = (fees, UserId) => __awaiter(void 0, void 0, void 0, function* () {
        const walletData = yield wallet_1.default.findOne({ userId: UserId });
        if (!walletData) {
            throw new Error("Wallet not found");
        }
        const newBalance = walletData.balance - fees;
        //@ts-ignore
        walletData === null || walletData === void 0 ? void 0 : walletData.balance = newBalance;
        yield walletData.save();
    });
    const getWalletBalance = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const walletData = yield wallet_1.default.findOne({ userId: userId });
        const balanceAmount = walletData === null || walletData === void 0 ? void 0 : walletData.balance;
        return balanceAmount;
    });
    const amountDebit = (userId, Amount) => __awaiter(void 0, void 0, void 0, function* () {
        const WalletId = yield wallet_1.default.findOne({ userId: userId });
        const walletTransaction = yield transations_1.default.create({
            walletId: WalletId,
            userId: userId,
            amount: Amount,
            type: "Debit",
            Description: "Wallet Payment"
        });
    });
    const amountCredit = (fee, UserId) => __awaiter(void 0, void 0, void 0, function* () {
        const WalletId = yield wallet_1.default.findOne({ userId: UserId });
        const walletTransaction = yield transations_1.default.create({
            walletId: WalletId,
            userId: UserId,
            amount: fee,
            type: "Credit",
            Description: "Refund Amound"
        });
    });
    return {
        createBooking,
        getAllPatients,
        getSinglePatient,
        updateBooking,
        getBookingById,
        getAllBookingByUserId,
        deleteSlot,
        changeBookingStatus,
        getAllBookingByDoctorId,
        changeBookingstatusPayment,
        changeWalletMoney,
        changeTheWallet,
        getWalletBalance,
        amountDebit,
        amountCredit,
    };
};
exports.bookingRepositoryMongodb = bookingRepositoryMongodb;
