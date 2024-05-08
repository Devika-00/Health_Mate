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
    try {
      const access_token = req.headers.authorization;
      if (!access_token) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ success: false, message: "Access token is required" });
      }

      // Parse authorization header to extract token
      const token = access_token.split(" ")[1];

      // Decode the token
      const decodedToken = jwt.decode(token) as JwtPayload;

      if (!decodedToken || !decodedToken.role) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ success: false, message: "Invalid access token" });
      }

      if (decodedToken.role === "user") {
        const user = await getUserById(decodedToken.id, dbRepositoryUser);
        return res
          .status(HttpStatus.OK)
          .json({ success: true, access_token, user });
      } else if (decodedToken.role === "doctor") {
        const restaurant = await getDoctorById(
          decodedToken.id,
          dbRepositoryRestaurant
        );
        return res
          .status(HttpStatus.OK)
          .json({ success: true, access_token, user: restaurant });
      }

      return res
        .status(HttpStatus.OK)
        .json({ success: true, access_token });
    } catch (error) {
      console.error("Error in token controller:", error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Internal server error" });
    }
  };

  return { returnAccessToClient };
};

export default tokenContoller;
