import { Request, Response, NextFunction } from "express";
import PetModel from "../models/PetModel.js";
import DonateModel from "../models/donationModel.js";
import PetArticleModel from "../models/PetArticleModel.js";
import mongoose from "mongoose";
import { logger } from "../logger/Logger.js";
export const homePageUserService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  const pets = await PetModel.find();
  const latestPets = await PetModel.find().sort({ $natural: -1 }).limit(4).exec();
  if (!pets) {
    res.send("Add pets");
  }
  const first4pets=pets.slice(0,4)
  res.render("home-user", { pets: pets,first3pets:first4pets,latestPets:latestPets });
}

export const allPetsService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  const pets = await PetModel.find();
  res.render("all-pets", { pets: pets });
}

export const petDetailUserService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const pet = await PetModel.findById(req.params.id);
      if (!pet) {
        const error: any = Error("Not Found!");
        error.statusCode = 404;
        throw error;
      }
      res.render("pet-detail-user",{pet:pet})
    } catch (err:any) {
      logger.error('GET Post with id API Error');
      logger.error(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res
      .status(404)
      .json({ message: "GET Post with id API Error", status: 0 });
  }
   }
}

export const petCareTipService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  res.render("petcare-tips");
}

export const catTrainingTipService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  res.render("training-tip-cat")
}

export const dogTrainingTipService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  res.render("training-tip-dog")
}

export const donationUserService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  const requests =await DonateModel.find({});
  console.log(requests);
  return res.render("request-donation-user", { requests: requests });
}

export const dogApodtArticleService = async(
  req:Request,
  res: Response,
  next:NextFunction
) => {
  const articles = await PetArticleModel.find({ category: { $in: ['dog'] } });
  res.render("dog-article-user", {
    articles:articles
  })

}

export const catAdoptArticleService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  const articles = await PetArticleModel.find({ category: { $in: ['cat'] } });
  res.render("cat-article-user", {
    articles:articles
  })
}

//add


export const allCatsService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  const pets = await PetModel.find({ kind: { $in: ['cat'] } })
  res.render("all-cats", { pets: pets });
}
export const allDogsService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  const pets = await PetModel.find({ kind: { $in: ['dog'] } })
  res.render("all-dogs", { pets: pets });
}
export const allOtherService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  const pets = await PetModel.find({ kind: { $in: ['other'] } })
  res.render("all-other", { pets: pets });
}
