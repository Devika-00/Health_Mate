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
const httpStatus_1 = require("../types/httpStatus");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userAuth_1 = require("../app/use-cases/user/auth/userAuth");
const authDoctor_1 = require("../app/use-cases/doctor/authDoctor");
const tokenContoller = (authServiceInterface, authServiceImpl, userDbRepository, userDbRepositoryImpl, restaurantDbRepository, restaurantDbRepositoryImpl) => {
    const authService = authServiceInterface(authServiceImpl());
    const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
    const dbRepositoryRestaurant = restaurantDbRepository(restaurantDbRepositoryImpl());
    /*
     * METHOD:GET,
     * Return acces token to client
     */
    const returnAccessToClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const access_token = req.headers.authorization;
            if (!access_token) {
                return res
                    .status(httpStatus_1.HttpStatus.BAD_REQUEST)
                    .json({ success: false, message: "Access token is required" });
            }
            // Parse authorization header to extract token
            const token = access_token.split(" ")[1];
            // Decode the token
            const decodedToken = jsonwebtoken_1.default.decode(token);
            if (!decodedToken || !decodedToken.role) {
                return res
                    .status(httpStatus_1.HttpStatus.UNAUTHORIZED)
                    .json({ success: false, message: "Invalid access token" });
            }
            if (decodedToken.role === "user") {
                const user = yield (0, userAuth_1.getUserById)(decodedToken.id, dbRepositoryUser);
                return res
                    .status(httpStatus_1.HttpStatus.OK)
                    .json({ success: true, access_token, user });
            }
            else if (decodedToken.role === "doctor") {
                const restaurant = yield (0, authDoctor_1.getDoctorById)(decodedToken.id, dbRepositoryRestaurant);
                return res
                    .status(httpStatus_1.HttpStatus.OK)
                    .json({ success: true, access_token, user: restaurant });
            }
            return res
                .status(httpStatus_1.HttpStatus.OK)
                .json({ success: true, access_token });
        }
        catch (error) {
            console.error("Error in token controller:", error);
            return res
                .status(httpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: "Internal server error" });
        }
    });
    return { returnAccessToClient };
};
exports.default = tokenContoller;
