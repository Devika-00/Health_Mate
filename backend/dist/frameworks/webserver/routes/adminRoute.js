"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = __importDefault(require("../../../adapters/adminController"));
const authServiceInterface_1 = require("../../../app/service-interface/authServiceInterface");
const authService_1 = require("../../services/authService");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const userDbRepository_1 = require("../../../app/interfaces/userDbRepository");
const userRepositoryMongodb_1 = require("../../database/mongodb/repositories/userRepositoryMongodb");
const doctorDBRepository_1 = require("../../../app/interfaces/doctorDBRepository");
const doctorRepositoryMongodb_1 = require("../../database/mongodb/repositories/doctorRepositoryMongodb");
const departmentDbRepository_1 = require("../../../app/interfaces/departmentDbRepository");
const departmentRepositoryMongodb_1 = require("../../database/mongodb/repositories/departmentRepositoryMongodb");
exports.default = () => {
    const router = (0, express_1.Router)();
    const controller = (0, adminController_1.default)(authServiceInterface_1.authServiceInterface, authService_1.authService, userDbRepository_1.userDbRepository, userRepositoryMongodb_1.userRepositoryMongodb, doctorDBRepository_1.doctorDbRepository, doctorRepositoryMongodb_1.doctorRepositoryMongodb, departmentDbRepository_1.departmentDbRepository, departmentRepositoryMongodb_1.departmentRepositoryMongodb);
    router.post("/login", controller.adminLogin);
    router.get("/users", authMiddleware_1.authenticateAdmin, controller.getAllUser);
    router.get("/doctors", authMiddleware_1.authenticateAdmin, controller.getAllTheDoctors);
    router.get("/appoinments", authMiddleware_1.authenticateAdmin, controller.getAllAppoinments);
    router.patch("/block_user/:id", authMiddleware_1.authenticateAdmin, controller.userBlock);
    router.patch("/block_doctor/:id", authMiddleware_1.authenticateAdmin, controller.doctorBlock);
    router.get("/doctors/:id", authMiddleware_1.authenticateAdmin, controller.doctorDetails);
    router.patch("/verify_doctor/:id", authMiddleware_1.authenticateAdmin, controller.VerifyDoctor);
    router.patch("/verify_doctor_rejection/:id", authMiddleware_1.authenticateAdmin, controller.rejectionDoctor);
    router.post("/addDepartment", authMiddleware_1.authenticateAdmin, controller.addDepartment);
    router.get("/departments", authMiddleware_1.authenticateAdmin, controller.getAllDepartments);
    router.put("/departments/:id", authMiddleware_1.authenticateAdmin, controller.updateDepartment);
    router.patch("/unlist_department/:id", authMiddleware_1.authenticateAdmin, controller.unlistDepartment);
    return router;
};
