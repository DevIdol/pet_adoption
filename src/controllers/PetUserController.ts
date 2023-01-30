import { Request, Response, NextFunction } from "express";
import {
  petDetailUserService,
} from "../services/PetUserService.js";

export const petDetailUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  petDetailUserService(req, res, next);
};


