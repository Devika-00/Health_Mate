export default function userEntity(
    name:string,
    email:string,
    password:string,
    authenticationMethod:string,
){
    return{
        name:():string => name,
        getEmail:():string => email,
        getPassword: (): string => password,
        getAuthenticationMethod:():string =>authenticationMethod,
    };
}
export type userEntityType = ReturnType<typeof userEntity>;

export function googleSignInUserEntity(
    name: string,
    email: string,
    picture: string,
    email_verified: boolean,
    authenticationMethod:string,
  ) {
    return {
      name: (): string => name,
      email: (): string => email,
      picture: (): string => picture,
      email_verified: (): boolean => email_verified,
      authenticationMethod:():string =>authenticationMethod,
    };
  }
  export type googleSignInUserEntityType = ReturnType<
    typeof googleSignInUserEntity
  >;