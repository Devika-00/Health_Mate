export interface CreateDoctorInterface {
    doctorName: string;
    email: string;
    mobile: string;
    password: string;
    verificationToken: string;
    phoneNumber:string,
    department:string,
    education:string,
    description:string,
    experience:string,
    rejectedReason:string,
    consultationType:string,
    lisenceCertificate:string,
}

export interface DoctorInterface {
    id: string;
    doctorName: string;
    email: string;
    mobile : string;
    password: string;
    profilePicture?: string;
    role: "doctor";
    gender: string;
    education:string;
    description:string;
    experience:string;
    rejectedReason:string;
    consultationType:string,
    certicateUpload?: string;
    lisenceCertificate?:string;
    department: string;
    isVerified?:boolean; 
    isBlocked: boolean;
    isApproved:boolean;
    createdAt?: Date;
}