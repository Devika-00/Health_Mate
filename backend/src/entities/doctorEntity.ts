export default function doctorEntity(
    doctorName: string,
    email: string,
    password: string, 
    verificationToken: string,  
){
    return{
        getDoctorName: () : string => doctorName,
        getEmail: () : string => email,
        getPassword: (): string => password,
        getVerificationToken: (): string => verificationToken,
    };
}

export type doctorEntityType = ReturnType<typeof doctorEntity>;