import { Request, Response, NextFunction } from "express";
import { AdoptionFormService } from "../services/AdoptionService";

export const adoptionForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  AdoptionFormService(req, res, next);
};
