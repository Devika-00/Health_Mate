export interface CreateUserInterface{
    name: string;
    email: string;
    password: string;
    authenticationMethod:string,

}

export interface UserInterface {
    id: string;
    name: string;
    email: string;
    password: string,
    authenticationMethod:string,
    profilePicture?: string;
    phoneNumber?:string;
    gender: string;
    age: number;
    role: string;
    isVerified: boolean;
    isBlocked: boolean;
    createdAt?: Date;
   
}
