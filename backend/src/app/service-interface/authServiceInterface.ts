import { AuthserviceReturn } from "../../frameworks/services/authService";

export const authServiceInterface = (service:AuthserviceReturn) =>{
    const encryptPassword = async (password: string)=> service.encryptPassword(password);

    const comparePassword = async (inputPassword: string, password: string)=>service.comparePassword(inputPassword,password);

    const generateOTP = () => service.generateOTP();

    const getRandomString = () => service.getRandomString();

    const createTokens = (id: string, name: string, role:string)=>service.createTokens(id,name,role);
    

    const doctorCreateTokens = (id:string, name: string, role:string)=>service.doctorCreateTokens(id,name,role);

    return{
        encryptPassword,
        generateOTP,
        comparePassword,
        createTokens,
        getRandomString,
        doctorCreateTokens,
    };
};

export type AuthServiceInterfaceType = typeof authServiceInterface;