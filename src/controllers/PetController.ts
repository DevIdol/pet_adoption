import { Request, Response, NextFunction } from "express";
import {
  petFormService,
  petUploadService,
  petDetailService,
  petDeleteService,
  petUpdateFormService,
  petUpdateService,
  donateRequestService,
  donateRequestCreateService,
  donationDeleteService,
  donationUpdateFormService,
  donationUpdateService,
  petArticleFormService,
  petArticleService,
  petArticleDeleteService,
  petArticelUpdateFormService,
  petArticleUpdateService

} from "../services/PetService.js";

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

// Donate section
export const donateRequest = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  donateRequestService(req, res, next);
}

export const donateRequestCreate = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  donateRequestCreateService(req, res, next);
}


export const donationDelete = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  donationDeleteService(req, res, next);
}

export const donationUpdateForm = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  donationUpdateFormService(req, res, next);
}

export const donationUpdate = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  donationUpdateService(req, res, next);
}


//pet Article
export const petArticleForm = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  petArticleFormService(req, res, next);
}

export const petArticle = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  petArticleService(req, res, next);
}


export const petArticleDelete = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  petArticleDeleteService(req, res, next);
}

export const petArticelUpdateForm = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  petArticelUpdateFormService(req, res, next);
}

export const petArticleUpdate = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  petArticleUpdateService(req, res, next);
}