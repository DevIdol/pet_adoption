import { Request, Response, NextFunction } from "express";
import {
  homePageUserService,
  allPetsService,
  petDetailUserService,
  petCareTipService
} from "../services/PetUserService.js";

export const homePageUser = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  homePageUserService(req, res, next);
}

export const allPets =async (
  req: Request,
  res: Response,
  next:NextFunction
) => {
  allPetsService(req, res, next);
}

export const petDetailUser = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  petDetailUserService(req, res, next);
}

export const petCareTip = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  petCareTipService(req, res, next);
}