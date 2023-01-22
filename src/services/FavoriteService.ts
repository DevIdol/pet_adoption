import { NextFunction, Request, Response } from "express";
import User from "../models/UserModel";
import PetModel from "../models/PetModel";
import FavoriteModel from "../models/FavoriteModel";

export const favoriteService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: any = req.user;
    let user: any = await User.findById(userId._id);
    const fav: any = await FavoriteModel.find({ userId: userId._id });
    const pet: any = await PetModel.findById(req.params.id);
    let arr: any = [];
    let favArr: any = [];
    let petsId: any;
    fav.find((f: any) => {
      let petId = String(f.pets);
      const isFav = String(f.pets) === String(pet._id);
      favArr.push(petId);
      arr.push(isFav);
    });

    favArr
      .filter((v: any) => v == req.params.id)
      .map((v: any) => {
        petsId = v;
      });
    if (!arr.includes(true)) {
      await PetModel.updateOne(
        { _id: req.params.id },
        { $set: { isFav: "active" } }
      );
      const favorite = new FavoriteModel({
        userId: userId._id,
        pets: pet,
      });
      let saveFav = await favorite.save();
      user.favorites.push(saveFav);
      user.save();
      res.redirect("/");
    } else {
      const fav: any = await FavoriteModel.findOne({
        pets: petsId,
      });
      await PetModel.updateOne({ _id: req.params.id }, { $set: { isFav: "" } });
      await FavoriteModel.deleteOne({ _id: fav.id });
      user.favorites = user.favorites.filter((f: any) => String(f) !== fav.id);
      user.save();
      req.flash("success", "Removed Success!");
      res.redirect("/favorites");
    }
  } catch (err: any) {
    console.log(err);
  }
};

export const deleteFavoriteService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: any = req.user;
    let user: any = await User.findById(userId._id);
    const fav: any = await FavoriteModel.find({ userId: userId._id });
    const petId: any = req.body.petId;
    let arr: any = [];
    fav.find((f: any) => {
      const isFav = String(f.userId) === userId._id;
      arr.push(isFav);
    });

    if (arr.includes(true)) {
      user.favorites = user.favorites.filter(
        (f: any) => String(f) !== req.params.id
      );
      user.save();
      await PetModel.updateOne({ _id: petId }, { $set: { isFav: "" } });
      await FavoriteModel.findByIdAndDelete(req.params.id);
      req.flash("success", "Removed Success!");
      res.redirect("/favorites");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
};
