export default function doctorEntity(
  doctorName: string,
  email: string,
  password: string, 
  verificationToken: string,
  phoneNumber: string,
  department: string,
  consultationType:string,
  education: string,
  description:string,
  experience:string,
  rejectedReason:string,
  lisenceCertificate: string, 
){
  return {
      getDoctorName: () : string => doctorName,
      getEmail: () : string => email,
      getPassword: (): string => password,
      getVerificationToken: (): string => verificationToken,
      getPhoneNumber: (): string => phoneNumber,
      getDepartment: (): string => department,
      getConsultationType:():string=>consultationType,
      getEducation: (): string => education,
      getDescription:():string =>description,
      getExperience:():string =>experience,
      getRejectedReason:():string=>rejectedReason,
      getLisenceCertificate: (): string => lisenceCertificate,
  };
}

export type doctorEntityType = ReturnType<typeof doctorEntity>;

export function googleSignInUserEntity(
  name: string,
  email: string,
  picture: string,
  email_verified: boolean,
){
  return {
      doctorName: (): string => name,
      email: (): string => email,
      picture: (): string => picture,
      email_verified: (): boolean => email_verified,
  };
}

export type googleSignInUserEntityType = ReturnType<typeof googleSignInUserEntity>;
