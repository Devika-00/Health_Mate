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
exports.WalletTransactions = exports.getWalletUser = exports.updateUser = exports.getUserProfile = void 0;
const getUserProfile = (userID, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.getUserbyId(userID);
    return user;
});
exports.getUserProfile = getUserProfile;
const updateUser = (userID, updateData, userRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield userRepository.updateProfile(userID, updateData); });
exports.updateUser = updateUser;
const getWalletUser = (userId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const amount = userRepository.getWallet(userId);
    return amount;
});
exports.getWalletUser = getWalletUser;
const WalletTransactions = (userId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield userRepository.getTransactions(userId);
    return transactions;
});
exports.WalletTransactions = WalletTransactions;
