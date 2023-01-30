import { NextFunction, Request, Response } from "express";
import User from "../models/UserModel";
import PetModel from "../models/PetModel";
import FavoriteModel from "../models/FavoriteModel";

export const addToFavService = async (
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

    let favId: any;
    fav.find((f: any) => {
      const isFav = String(f.pets) === String(pet._id);
      arr.push(isFav);
    });

    fav
      .filter((f: any) => String(f.pets) == req.params.id)
      .map((p: any) => {
        favId = p._id;
      });

    if (!arr.includes(true)) {
      const favorite = new FavoriteModel({
        userId: userId._id,
        pets: pet,
      });
      let saveFav = await favorite.save();
      user.favorites.push(saveFav);
      user.save();
      req.flash("success", "Saved!");
      res.redirect("/");
    } else {
      const fav: any = await FavoriteModel.findOne({
        _id: favId,
      });
      await FavoriteModel.deleteOne({ _id: fav.id });
      user.favorites = user.favorites.filter((f: any) => String(f) !== fav.id);
      user.save();
      req.flash("error", "Removed!");
      res.redirect("/");
    }
  } catch (err: any) {
    console.log(err);
    res.render("not-found", { error: "Something Wrong!" });
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
      await FavoriteModel.findByIdAndDelete(req.params.id);
      req.flash("success", "Removed Success!");
      res.redirect("/favorites");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.render("not-found", { error: "Something Wrong!" });
  }
};
