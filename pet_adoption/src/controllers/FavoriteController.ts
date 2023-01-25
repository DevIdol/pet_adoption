import { Request, Response, NextFunction } from "express";
import {
  deleteFavoriteService,
  favoriteService,
} from "../services/FavoriteService";

export const createFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  favoriteService(req, res, next);
};

export const deleteFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  deleteFavoriteService(req, res, next);
};
