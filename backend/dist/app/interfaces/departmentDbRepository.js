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
exports.departmentDbRepository = void 0;
const departmentDbRepository = (repository) => {
    const addNewDepartment = (departmentName, isListed) => __awaiter(void 0, void 0, void 0, function* () {
        const addDepartment = yield repository.newDepartment(departmentName, isListed);
        return addDepartment;
    });
    const getDepartment = () => __awaiter(void 0, void 0, void 0, function* () {
        const addDepartment = yield repository.getAllDepartment();
        return addDepartment;
    });
    const updateDepartment = (departmentname, id) => __awaiter(void 0, void 0, void 0, function* () {
        const department = yield repository.updateDepartmentName(departmentname, id);
        return department;
    });
    const getDepartmentbyId = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getDepartmentbyId(id); });
    const updateDepartmentUnlist = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
        yield repository.updateDepartmentUnlist(id, status);
    });
    return {
        addNewDepartment,
        getDepartment,
        updateDepartment,
        getDepartmentbyId,
        updateDepartmentUnlist,
    };
};
exports.departmentDbRepository = departmentDbRepository;
