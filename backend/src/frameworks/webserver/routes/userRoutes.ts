import express from "express";
import { userDbRepository } from "../../../app/interfaces/userDbRepository";
import { authService } from "../../services/authService";
import { userRepositoryMongodb } from "../../database/mongodb/repositories/userRepositoryMongodb";
import { authServiceInterface } from "../../../app/service-interface/authServiceInterface";
import userController from "../../../adapters/userController";
import authenticateUser, { authenticateDoctor } from "../middlewares/authMiddleware";
import doctorController from "../../../adapters/doctorController";
import { doctorDbRepository } from "../../../app/interfaces/doctorDBRepository";
import { doctorRepositoryMongodb } from "../../database/mongodb/repositories/doctorRepositoryMongodb";
import { timeSlotDbRepository } from "../../../app/interfaces/timeSlotDbRepository";
import {  timeSlotRepositoryMongodb } from "../../database/mongodb/repositories/timeSlotRepositotyMongodb";
import bookingController from "../../../adapters/bookingController";
import { bookingDbRepository } from "../../../app/interfaces/bookingDbRepository";
import { bookingRepositoryMongodb } from "../../database/mongodb/repositories/BookingRepositoryMongodb";
import { prescriptionDbRepository } from "../../../app/interfaces/prescriptionDbRepository";
import { prescriptionRepositoryMongodb } from "../../database/mongodb/repositories/prescriptionRepositoryMongodb";
import { departmentDbRepository } from "../../../app/interfaces/departmentDbRepository";
import { departmentRepositoryMongodb } from "../../database/mongodb/repositories/departmentRepositoryMongodb";


const userRoutes = () =>{
    const router = express.Router();

    const controller:any = userController(
        authServiceInterface,
        authService,
        userDbRepository,
        userRepositoryMongodb,
        doctorDbRepository,
        doctorRepositoryMongodb,
        timeSlotDbRepository,
        timeSlotRepositoryMongodb,
        prescriptionDbRepository,
        prescriptionRepositoryMongodb,
        departmentDbRepository,
        departmentRepositoryMongodb

    );


    const _bookingController = bookingController(
        userDbRepository,
        userRepositoryMongodb,
        doctorDbRepository,
        doctorRepositoryMongodb,
        timeSlotDbRepository,
        timeSlotRepositoryMongodb,
        bookingDbRepository,
        bookingRepositoryMongodb,
    )

//user Authentication Routes//

router.post("/register",controller.registerUser);
router.post("/verify_otp",controller.verifyOtp);
router.post("/resend_otp", controller.resendOtp);
router.post("/login",controller.userLogin);
router.post("/google_signIn", controller.googleSignIn);
router.post("/forgot_password",controller.forgotPassword);
router.post("/reset_password/:token",controller.resetPassword);

router.get("/profile", authenticateUser, controller.userProfile);
router.get("/doctors", authenticateUser, controller.doctorPage);
router.get("/timeslots",authenticateUser,controller.getAllTimeSlots);
router.get("/doctor/:id", authenticateUser,controller.doctorDetails);
router.patch("/profile/edit", authenticateUser, controller.updateUserInfo);
router.get("/timeslots/:id",authenticateUser,controller.getTimeslots);
router.get("/time-slots/:id/dates",authenticateUser,controller.getDateSlots);
router.post("/fetchPrescription",authenticateUser,controller.fetchPrescription);
router.post("/uploadDocuments",authenticateUser,controller.labRecords);
router.get("/documents/:id",authenticateUser,controller.fetchDocuments);
router.delete("/documents/:id",authenticateUser,controller.deleteDocument);
router.get("/fetchWallet/:id",authenticateUser,controller.getWallet);
router.get("/transactions", authenticateUser, controller.getTransactions);
router.get("/departments",authenticateUser,controller.getAllDepartments);

/*  Booking Routes for booking Controller  */

router.post("/appointments",authenticateUser,_bookingController.BookAppoinment);
router.get("/allAppoinments",authenticateUser,_bookingController.getAllAppoinments);
router.patch("/payment/status/:id",authenticateUser,_bookingController.updatePaymentStatus);
router.post("/walletPayment",authenticateUser,_bookingController.walletPayment);
router.put("/updateWallet",authenticateUser,_bookingController.changeWalletAmount);
router.get("/bookingdetails/:id",authenticateUser,_bookingController.getBookingDetails);
router.get("/bookings/:id",authenticateUser,_bookingController.getAllBookingDetails);
router.put("/bookingdetails/:id",authenticateUser,_bookingController.cancelAppoinment);


return router;

};


export default userRoutes;