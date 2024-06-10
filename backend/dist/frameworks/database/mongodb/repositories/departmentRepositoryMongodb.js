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
exports.departmentRepositoryMongodb = void 0;
const Department_1 = __importDefault(require("../models/Department"));
const departmentRepositoryMongodb = () => {
    const newDepartment = (departmentName, isListed) => __awaiter(void 0, void 0, void 0, function* () {
        const response = new Department_1.default({
            departmentName: departmentName,
            isListed: isListed,
        });
        yield response.save();
        return response;
    });
    const getAllDepartment = () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield Department_1.default.find({ isListed: true });
        return response;
    });
    const updateDepartmentUnlist = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
        yield Department_1.default.findByIdAndUpdate(id, { isListed: status });
    });
    const updateDepartmentName = (departmentName, id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield Department_1.default.findByIdAndUpdate(id, { departmentName: departmentName }, { new: true, runValidators: true });
            return response;
        }
        catch (error) {
            console.error("Error updating department name:", error);
            throw error;
        }
    });
    const getDepartmentbyId = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield Department_1.default.findById(id); });
    return {
        newDepartment,
        getAllDepartment,
        updateDepartmentName,
        getDepartmentbyId,
        updateDepartmentUnlist,
    };
};
exports.departmentRepositoryMongodb = departmentRepositoryMongodb;
