"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleSignInUserEntity = void 0;
function userEntity(name, email, password, authenticationMethod) {
    return {
        name: () => name,
        getEmail: () => email,
        getPassword: () => password,
        getAuthenticationMethod: () => authenticationMethod,
    };
}
exports.default = userEntity;
function googleSignInUserEntity(name, email, picture, email_verified, authenticationMethod) {
    return {
        name: () => name,
        email: () => email,
        picture: () => picture,
        email_verified: () => email_verified,
        authenticationMethod: () => authenticationMethod,
    };
}
exports.googleSignInUserEntity = googleSignInUserEntity;
