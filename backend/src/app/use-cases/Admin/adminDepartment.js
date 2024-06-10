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
exports.departmentUnlist = exports.departmentUpdate = exports.Department = exports.addOneDepartment = void 0;
const addOneDepartment = (departmentName, isListed, departmentDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const department = yield departmentDbRepository.addNewDepartment(departmentName, isListed);
    return department;
});
exports.addOneDepartment = addOneDepartment;
const Department = (departmentDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const department = yield departmentDbRepository.getDepartment();
    return department;
});
exports.Department = Department;
const departmentUpdate = (departmentname, id, departmentDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const department = yield departmentDbRepository.updateDepartment(departmentname, id);
    return department;
});
exports.departmentUpdate = departmentUpdate;
const departmentUnlist = (id, departmentDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const department = yield departmentDbRepository.getDepartmentbyId(id);
    yield departmentDbRepository.updateDepartmentUnlist(id, !(department === null || department === void 0 ? void 0 : department.isListed));
    return department;
});
exports.departmentUnlist = departmentUnlist;
