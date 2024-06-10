"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authServiceInterface_1 = require("../../../app/service-interface/authServiceInterface");
const authService_1 = require("../../services/authService");
const tokenController_1 = __importDefault(require("../../../adapters/tokenController"));
const userRepositoryMongodb_1 = require("../../database/mongodb/repositories/userRepositoryMongodb");
const userDbRepository_1 = require("../../../app/interfaces/userDbRepository");
const doctorDBRepository_1 = require("../../../app/interfaces/doctorDBRepository");
const doctorRepositoryMongodb_1 = require("../../database/mongodb/repositories/doctorRepositoryMongodb");
const refreshTokenRoute = () => {
    const router = express_1.default.Router();
    const controller = (0, tokenController_1.default)(authServiceInterface_1.authServiceInterface, authService_1.authService, userDbRepository_1.userDbRepository, userRepositoryMongodb_1.userRepositoryMongodb, doctorDBRepository_1.doctorDbRepository, doctorRepositoryMongodb_1.doctorRepositoryMongodb);
    router.get("/accessToken", controller.returnAccessToClient);
    return router;
};
exports.default = refreshTokenRoute;
