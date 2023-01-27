import { Request, Response, NextFunction } from "express";
import {
  petArticleGetService,
  petArticleService
} from "../services/ArticleService.js";

export const petArticleGet = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  petArticleGetService(req, res, next);
}
export const petArticle = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  petArticleService(req, res, next);
}