import { Request, Response, NextFunction } from "express";
import {
  petGetService,
  petUploadService,
  petDeleteService
} from "../services/PetService.js";

//get
export const petGet = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  petGetService(req, res, next);
}

//post
export const petUpload = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  petUploadService(req, res, next);
}

//update

//delete
export const petDelete = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  petDeleteService(req, res, next);
}