import express from "express";
import { authServiceInterface } from "../../../app/service-interface/authServiceInterface";
import { authService } from "../../services/authService";
import tokenContoller from "../../../adapters/tokenController";
import { userRepositoryMongodb } from "../../database/mongodb/repositories/userRepositoryMongodb";
import { userDbRepository } from "../../../app/interfaces/userDbRepository";
import { doctorDbRepository } from "../../../app/interfaces/doctorDBRepository";
import { doctorRepositoryMongodb } from "../../database/mongodb/repositories/doctorRepositoryMongodb";

const refreshTokenRoute = () => {
  const router = express.Router();
  const controller = tokenContoller(
    authServiceInterface,
    authService,
    userDbRepository,
    userRepositoryMongodb,
    doctorDbRepository,
    doctorRepositoryMongodb
  );

  router.get("/accessToken", controller.returnAccessToClient);
  

  return router;
};
export default refreshTokenRoute;