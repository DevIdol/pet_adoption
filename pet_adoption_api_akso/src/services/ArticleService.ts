import { Request, Response, NextFunction } from "express";
import PetArticle from "../models/PetArticleModel.js";
import { validationResult } from "express-validator";
import { logger } from "../logger/Logger.js";

//get
export const petArticleGetService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const article =await PetArticle.find({});
    res.json({
      data: article,
      status: 1 
    });
  } catch (err: any) {
    logger.error('GET Post API Error');
    logger.error(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    res.status(403).json({ message: 'GET Post API Error', status: 1 });
  }
};

//post
export const petArticleService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    };
    if (req.body.category === "dog" || req.body.category === "cat") {
      const article = {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
      };

      const newArticle = new PetArticle(article);
      const result = await newArticle.save();
      res
        .status(201)
        .json({ message: "Article Created Successfully!", data: result, status: 1 });
    } else {
      res.status(405).json({ data: "Input only dog/cat" });
    }
  } catch (err: any) {
    logger.error('Create Post API Error');
    logger.error(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    res.status(403).json({ message: 'Create Post API Error', status: 1 });
  }
};