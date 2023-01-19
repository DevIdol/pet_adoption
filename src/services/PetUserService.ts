import { Request, Response, NextFunction } from "express";
import PetModel from "../models/PetModel.js";
import mongoose from "mongoose";

export const petDetailUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const pet = await PetModel.findById(req.params.id);
      if (!pet) {
        res.render("not-found", { message: "Pet Not Found!" });
      }
      res.render("pet-detail", { pet: pet, token });
    } catch (err: any) {
      console.log(err);
    }
  }
};


