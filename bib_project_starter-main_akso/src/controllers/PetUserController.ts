import { Request, Response, NextFunction } from "express";
import {
  homePageUserService,
  allPetsService, 
  allCatsService,
  allDogsService,
  allOtherService,
  petDetailUserService,
  petCareTipService,
  catTrainingTipService,
  dogTrainingTipService,
  donationUserService,
  dogApodtArticleService,
  catAdoptArticleService
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

export const catTrainingTip = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  catTrainingTipService(req, res, next);
}

export const dogTrainingTip = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  dogTrainingTipService(req, res, next);
}

export const donationUser = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  donationUserService(req, res, next);
}

export const dogApodtArticle = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  dogApodtArticleService(req, res, next);
}

export const catAdoptArticle = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  catAdoptArticleService(req, res, next);
}

export const allCats = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  allCatsService(req, res, next);
}

export const allDogs = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  allDogsService(req, res, next);
}

export const allOther = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  allOtherService(req, res, next);
}