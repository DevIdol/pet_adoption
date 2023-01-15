import { NextFunction, Request, Response } from "express";
import { verifyEmailService } from "../services/UserService";

//verify email
export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyEmailService(req, res, next);
};
