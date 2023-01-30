import { Request, Response, NextFunction } from "express";
import {
  addToFavService,
  deleteFavoriteService,
} from "../services/FavoriteService";

export const createFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  addToFavService(req, res, next);
};

export const deleteFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  deleteFavoriteService(req, res, next);
};
