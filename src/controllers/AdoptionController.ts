import { Request, Response, NextFunction } from "express";
import { AdoptionFormService, AdoptonDeleteService } from "../services/AdoptionService";

export const adoptionForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  AdoptionFormService(req, res, next);
};

export const adoptionDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  AdoptonDeleteService(req, res, next);
};
