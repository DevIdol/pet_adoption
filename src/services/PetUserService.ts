import { Request, Response, NextFunction } from "express";
import PetModel from "../models/PetModel.js";
import mongoose from "mongoose";
import User from '../models/UserModel';
import jwtDecode from "jwt-decode";
import FavoriteModel from "../models/FavoriteModel.js";

export const petDetailUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  let user: any;
  let petId: any[] = [];
  if (token) {
    const decoded: any = jwtDecode(token);
    user = decoded.user;
    await User.findById(user._id).populate("favorites");
    let Fav = await FavoriteModel.find({ userId: user._id });
    Fav.map((p: any) => {
      let pid = String(p.pets);
      petId.push(pid);
    });
  }
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const pet = await PetModel.findById(req.params.id);
      if (!pet) {
        res.render("not-found", { message: "Pet Not Found!" });
      }
      res.render("pet-detail", { pet: pet, token, user, petId });
    } catch (err: any) {
      res.render("not-found", { error: "Something Wrong!" });
    }
  }
};


