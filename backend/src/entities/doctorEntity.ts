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

export function googleSignInUserEntity(
    name: string,
    email: string,
    picture: string,
    email_verified: boolean,
  ) {
    return {
      doctorName: (): string => name,
      email: (): string => email,
      picture: (): string => picture,
      email_verified: (): boolean => email_verified,
    };
  }
  export type googleSignInUserEntityType = ReturnType<
    typeof googleSignInUserEntity
  >;