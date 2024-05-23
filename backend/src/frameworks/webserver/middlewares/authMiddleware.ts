import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HttpStatus } from "../../../types/httpStatus";
import configKeys from "../../../config";

// extending the request interface to include the user object in the req
declare global {
  namespace Express {
    interface Request {
      user?: any;
      doctor?: any;
    }
  }
}

const ADMIN_EMAIL = configKeys.ADMIN_EMAIL;
const ADMIN_PASSWORD = configKeys.ADMIN_PASSWORD;

// verify the token and validate user
export default function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const access_token = req.headers.authorization;
  if (!access_token) {
    return res.status(HttpStatus.FORBIDDEN).json("Your are not authenticated");
  }

  // Extract the token from the header (assuming it's in the format "Bearer <token>")
  const tokenParts = access_token.split(' ');
  const token = tokenParts.length === 2 ? tokenParts[1] : null;


  if (!token) {
    return res.status(HttpStatus.FORBIDDEN).json("Invalid access token format");
  }

  jwt.verify(token, configKeys.ACCESS_SECRET, (err: any, user: any) => {
    if (err) {
      res
        .status(HttpStatus.FORBIDDEN)
        .json({ success: false, message: "Token is not valid" });
    } else {
      
      req.user = user.id;
      next();
    }
  });
}


export async function authenticateDoctor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const access_token = req.headers.authorization;
    if (!access_token) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json("You are not authenticated");
    }

    const tokenParts = access_token.split(' ');
    const token = tokenParts.length === 2 ? tokenParts[1] : null;

    if (!token) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json("Invalid access token format");
    }

    const doctor = jwt.verify(
      token,
      configKeys.ACCESS_SECRET
    ) as JwtPayload;

    if (doctor.role === "doctor") {
      req.doctor = doctor.id;
      return next();
    }

    return res.status(HttpStatus.FORBIDDEN).json({
      success: false,
      message: "You are not allowed to access this resource",
      doctor,
    });
  } catch (error) {
    return res
      .status(HttpStatus.FORBIDDEN)
      .json({ success: false, message: "Token is not valid" });
  }
}


// Admin authorization to get the access to routes in admin
export function authenticateAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(HttpStatus.FORBIDDEN).json("You are not authenticated");

  const access_token = authHeader.split(" ")[1];
  jwt.verify(access_token, configKeys.ACCESS_SECRET, (err: any, user: any) => {
    if (err) {
      res
        .status(HttpStatus.FORBIDDEN)
        .json({ success: false, message: "Token is not valid" });
    } else {
      if (user.role === "admin") {
        return next();
      }
      return res.status(HttpStatus.FORBIDDEN).json({
        success: false,
        message: "Your are not allowed to access this resource",
        user,
      });
    }
  });
}