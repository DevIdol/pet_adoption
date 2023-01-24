import { NextFunction, Request, Response } from "express";
import User from "../models/UserModel";
import AdoptionModel from "../models/AdoptionModel";

export const AdoptionFormService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: any = req.user;
    let user: any = await User.findOne({ _id: userId._id });
    let petId = req.body.petId;
    let adoption = await AdoptionModel.findOne({ petId: petId });
    let adoptionInfo = { userId: userId._id, ...req.body };
    if (!adoption) {
      if (req.body.desc) {
        const newAdoption = new AdoptionModel(adoptionInfo);
        const savedAdoption = await newAdoption.save();
        user.adoptions.push(savedAdoption);
        user.save();
        req.flash("success", "Filled Success!");
        res.redirect(`/pets/${petId}`);
      } else {
        res.setHeader("Content-Type", "text/html");
        req.flash("error", "Required Description");
        res.redirect(`/pets/${petId}`);
      }
    } else {
      req.flash("error", "Already Filled!");
      res.redirect(`/pets/${petId}`);
    }
  } catch (error) {
    res.render("not-found", { error: "Something Wrong!" });
  }
};

export const AdoptonDeleteService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: any = req.user;
    let user: any = await User.findById(userId._id);
    const ado: any = await AdoptionModel.find({ userId: userId._id });
    let arr: any = [];
    ado.find((a: any) => {
      const isAdo = String(a.userId) === userId._id;
      arr.push(isAdo);
    });
    if (arr.includes(true)) {
      user.adoptions = user.adoptions.filter(
        (a: any) => String(a) !== req.params.id
      );
      user.save();
      await AdoptionModel.findByIdAndDelete(req.params.id);
      req.flash("success", "Removed Success!");
      res.redirect("/adoption-form");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.render("not-found", { error: "Something Wrong!" });
  }
};
