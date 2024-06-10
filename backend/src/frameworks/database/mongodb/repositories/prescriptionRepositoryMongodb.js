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
exports.prescriptionRepositoryMongodb = void 0;
const Booking_1 = __importDefault(require("../models/Booking"));
const Prescription_1 = __importDefault(require("../models/Prescription"));
const Document_1 = __importDefault(require("../models/Document"));
const prescriptionRepositoryMongodb = () => {
    const addPrescriptions = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { appointmentId, prescriptionDate, medicines } = data;
        try {
            // Find the appointment by ID
            const appointment = yield Booking_1.default.findById(appointmentId);
            if (!appointment) {
                return { status: false, message: "Appointment not found" };
            }
            const { userId, doctorId } = appointment;
            // Validate prescriptionDate and medicines
            if (!prescriptionDate || !medicines.length) {
                return { status: false, message: "Required fields are missing" };
            }
            // Create a new Prescription document
            const newPrescription = new Prescription_1.default({
                appointmentId,
                doctorId,
                userId,
                prescriptionDate,
                medicines,
            });
            // Save the new prescription
            const savedPrescription = yield newPrescription.save();
            return savedPrescription;
        }
        catch (error) {
            console.error('Error adding prescription:', error);
            return { status: false, message: "An error occurred while adding prescription" };
        }
    });
    const fetPrescriptions = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { appoinmentId } = data;
        const prescription = yield Prescription_1.default.findOne({
            appointmentId: appoinmentId
        });
        return prescription;
    });
    const fetchPrescriptionlist = (data) => __awaiter(void 0, void 0, void 0, function* () {
        const prescription = yield Prescription_1.default.find({ appointmentId: data });
        return prescription;
    });
    const uploadDocument = (appoinmentId, documentsData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Loop through each document and save it to the database
            const savedDocuments = yield Promise.all(documentsData.map((doc) => __awaiter(void 0, void 0, void 0, function* () {
                const newDocument = new Document_1.default({
                    appoinmentId: appoinmentId,
                    fileName: doc.name,
                    fileData: doc.url,
                });
                return yield newDocument.save();
            })));
            return savedDocuments;
        }
        catch (error) {
            console.error('Error uploading documents:', error);
            throw new Error('Error uploading documents');
        }
    });
    const getLabDocument = (appoinmentId) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield Document_1.default.find({ appoinmentId: appoinmentId });
        return response;
    });
    const deletePrescriptionDetail = (prescriptionId) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield Prescription_1.default.findOneAndDelete({ _id: prescriptionId });
        return response;
    });
    const deleteDocumentSingles = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield Document_1.default.findOneAndDelete({ _id: id });
        return response;
    });
    return {
        addPrescriptions,
        fetPrescriptions,
        uploadDocument,
        getLabDocument,
        fetchPrescriptionlist,
        deletePrescriptionDetail,
        deleteDocumentSingles,
    };
};
exports.prescriptionRepositoryMongodb = prescriptionRepositoryMongodb;
