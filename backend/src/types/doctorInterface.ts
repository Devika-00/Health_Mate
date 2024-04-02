export interface CreateDoctorInterface {
    doctorName: string;
    email: string;
    mobile: string;
    password : string;
    verificationToken: string;
}

export interface DoctorInterface {
    id: string;
    doctorName: string;
    email: string;
    mobile : string;
    password: string;
    role: "doctor";
    gender: string;
    department: string;
    isVerified?:boolean;
}