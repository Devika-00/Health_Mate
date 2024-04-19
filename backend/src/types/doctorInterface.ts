export interface CreateDoctorInterface {
    doctorName: string;
    email: string;
    mobile: string;
    password: string;
    verificationToken: string;
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
    certicateUpload?: string;
    lisenceCertificate?:string;
    department: string;
    isVerified?:boolean; 
    isBlocked: boolean;
    isApproved:boolean;
    createdAt?: Date;
}