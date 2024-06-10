"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleSignInUserEntity = void 0;
function doctorEntity(doctorName, email, password, verificationToken, phoneNumber, department, consultationType, education, description, experience, rejectedReason, lisenceCertificate) {
    return {
        getDoctorName: () => doctorName,
        getEmail: () => email,
        getPassword: () => password,
        getVerificationToken: () => verificationToken,
        getPhoneNumber: () => phoneNumber,
        getDepartment: () => department,
        getConsultationType: () => consultationType,
        getEducation: () => education,
        getDescription: () => description,
        getExperience: () => experience,
        getRejectedReason: () => rejectedReason,
        getLisenceCertificate: () => lisenceCertificate,
    };
}
exports.default = doctorEntity;
function googleSignInUserEntity(name, email, picture, email_verified) {
    return {
        doctorName: () => name,
        email: () => email,
        picture: () => picture,
        email_verified: () => email_verified,
    };
}
exports.googleSignInUserEntity = googleSignInUserEntity;
