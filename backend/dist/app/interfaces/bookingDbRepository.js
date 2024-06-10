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
exports.bookingDbRepository = void 0;
const bookingDbRepository = (repository) => {
    const createBooking = (data) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.createBooking(data); });
    const getAllPatients = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllPatients(); });
    const deleteSlot = (doctorId, date, timeSlot) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.deleteSlot(doctorId, date, timeSlot); });
    const getSinglePatient = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getSinglePatient(id); });
    const updateBookingDetails = (bookingId, updatingData) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updateBooking(bookingId, updatingData); });
    const getBookingById = (bookingId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getBookingById(bookingId); });
    const getAllBookingByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllBookingByUserId(userId); });
    const getAllBookingByDoctorId = (doctorId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllBookingByDoctorId(doctorId); });
    const changeBookingstatus = (appoinmentStatus, cancelReason, id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.changeBookingStatus(appoinmentStatus, cancelReason, id); });
    const changeBookingstatusPayment = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.changeBookingstatusPayment(id); });
    const changeWallet = (fee, userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.changeWalletMoney(fee, userId); });
    const changeTheWalletAmount = (fees, UserId) => __awaiter(void 0, void 0, void 0, function* () {
        yield repository.changeTheWallet(fees, UserId);
    });
    const getBalanceAmount = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const balance = yield repository.getWalletBalance(userId);
        return balance;
    });
    const debitAmount = (userId, Amount) => __awaiter(void 0, void 0, void 0, function* () {
        const amount = yield repository.amountDebit(userId, Amount);
    });
    const creditAmount = (fee, UserId) => __awaiter(void 0, void 0, void 0, function* () {
        const amount = yield repository.amountCredit(fee, UserId);
    });
    return {
        createBooking,
        getAllPatients,
        getSinglePatient,
        updateBookingDetails,
        getBookingById,
        getAllBookingByUserId,
        deleteSlot,
        changeBookingstatus,
        getAllBookingByDoctorId,
        changeBookingstatusPayment,
        changeWallet,
        changeTheWalletAmount,
        getBalanceAmount,
        debitAmount,
        creditAmount,
    };
};
exports.bookingDbRepository = bookingDbRepository;
