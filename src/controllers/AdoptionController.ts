import { Request, Response, NextFunction } from "express";
import { AdoptionFormService, AdoptionDeleteService, AdoptionAdminDeleteService } from "../services/AdoptionService";

//create adoption
export const adoptionForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  AdoptionFormService(req, res, next);
};

//delete adoption
export const adoptionDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  AdoptionDeleteService(req, res, next);
};

//delete adoption from admin
export const adoptionAdminDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  AdoptionAdminDeleteService(req, res, next);
};