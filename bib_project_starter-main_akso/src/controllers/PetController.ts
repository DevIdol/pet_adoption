import { Request, Response, NextFunction } from "express";
import {
  petFormService,
  petUploadService,
  petDetailService,
  petDeleteService,
  petUpdateFormService,
  petUpdateService,
  homePageAdminService,

} from "../services/PetService.js";


export const homePageAdmin = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  homePageAdminService(req, res, next);
}
export const petForm = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  petFormService(req, res, next);
}
export const petUpload = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  petUploadService(req, res, next);
}

export const petDetail = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  petDetailService(req, res, next);
}

export const petDelete = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  petDeleteService(req, res, next);
}

export const petUpdateForm = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  petUpdateFormService(req, res, next);
}

export const petUpdate = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  petUpdateService(req, res, next);
}
