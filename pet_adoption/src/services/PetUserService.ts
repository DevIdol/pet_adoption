import { Request, Response, NextFunction } from "express";
import PetModel from "../models/PetModel.js";
import mongoose from "mongoose";
import jwtDecode from "jwt-decode";

export const petDetailUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  let user: any;
  if (token) {
    const decoded: any = jwtDecode(token);
    user = decoded.user;
  }
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const pet = await PetModel.findById(req.params.id);
      if (!pet) {
        res.render("not-found", { message: "Pet Not Found!" });
      }
      res.render("pet-detail", { pet: pet, token, user });
    } catch (err: any) {
      res.render("not-found", { error: "Something Wrong!" });
    }
  }
};


