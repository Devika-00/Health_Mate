import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../types/httpStatus";
import { AuthServiceInterfaceType } from "../app/service-interface/authServiceInterface";
import { AuthService } from "../frameworks/services/authService";
import jwt, { JwtPayload } from "jsonwebtoken";
import configKeys from "../config";
import { userDbInterface } from "../app/interfaces/userDbRepository";
import { userRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/userRepositoryMongodb";
import { doctorDbInterface } from "../app/interfaces/doctorDBRepository";
import { doctorRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/doctorRepositoryMongodb";
import { getUserById } from "../app/use-cases/user/auth/userAuth";
import { getDoctorById } from "../app/use-cases/doctor/authDoctor";

const tokenContoller = (
  authServiceInterface: AuthServiceInterfaceType,
  authServiceImpl: AuthService,
  userDbRepository: userDbInterface,
  userDbRepositoryImpl: userRepositoryMongodbType,
  restaurantDbRepository: doctorDbInterface,
  restaurantDbRepositoryImpl: doctorRepositoryMongodbType
) => {
  const authService = authServiceInterface(authServiceImpl());
  const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
  const dbRepositoryRestaurant = restaurantDbRepository(
    restaurantDbRepositoryImpl()
  );

  /*
   * METHOD:GET,
   * Return acces token to client
   */

  const returnAccessToClient = async (req: Request, res: Response) => {
    const { access_token } = req.cookies;
    if (!access_token)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: "Access token is required" });

    const token: JwtPayload = jwt.decode(access_token) as JwtPayload;
    if (token?.role === "user") {
      const user = await getUserById(token.id, dbRepositoryUser);
      return res
        .status(HttpStatus.OK)
        .json({ success: true, access_token, user });
    } else if (token?.role === "seller") {
      const restaurant = await getDoctorById(
        token.id,
        dbRepositoryRestaurant
      );
      return res
        .status(HttpStatus.OK)
        .json({ success: true, access_token, user: restaurant });
    }
    return res.status(HttpStatus.OK).json({ success: true, access_token });
  };

  return {  returnAccessToClient };
};
export default tokenContoller;