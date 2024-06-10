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
exports.blockDoctor = exports.blockUser = void 0;
const blockUser = (id, userDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userDbRepository.getUserbyId(id);
    yield userDbRepository.updateUserBlock(id, !(user === null || user === void 0 ? void 0 : user.isBlocked)); //update user block status
    return user;
});
exports.blockUser = blockUser;
const blockDoctor = (id, doctorDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const doctor = yield doctorDbRepository.getDoctorById(id);
    yield doctorDbRepository.updateDoctorBlock(id, !(doctor === null || doctor === void 0 ? void 0 : doctor.isBlocked)); //update user block status
    return doctor;
});
exports.blockDoctor = blockDoctor;
