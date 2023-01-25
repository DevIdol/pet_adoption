import { NextFunction, Request, Response } from "express";
import User from "../models/UserModel";
import AdoptionModel from "../models/AdoptionModel";
import PetModel from "../models/PetModel";

export const AdoptionFormService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: any = req.user;
    let user: any = await User.findOne({ _id: userId._id });
    let petId = req.body.petId;

    let adoPet: any[] = [];
    let adoption: any = await AdoptionModel.find({ userId: userId });
    adoption.filter((ado: any) => {
      let isPet = String(ado.petId) == petId;
      adoPet.push(isPet);
    });
    let adoptionInfo = { userId: userId._id, ...req.body };
    if (!adoPet.includes(true)) {
      if (req.body.desc) {
        const newAdoption = new AdoptionModel(adoptionInfo);
        const savedAdoption = await newAdoption.save();
        user.adoptions.push(savedAdoption);
        user.save();
        req.flash("success", "Filled Success!");
        res.redirect(`/adoption-form`);
      } else {
        res.setHeader("Content-Type", "text/html");
        req.flash("error", "Required Description");
        res.redirect(`/pets/${petId}`);
      }
    } else {
      req.flash("error", "Already Filled!");
      res.redirect(`/adoption-form`);
    }
  } catch (error) {
    res.render("not-found", { error: "Something Wrong!" });
  }
};

//delete adoption
export const AdoptionDeleteService = async (
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

//delete adoption from admin
export const AdoptionAdminDeleteService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let userId = req.params.userId;
    let adoId = req.params.adoId;
    let user: any = await User.findById(userId);
    const ado: any = await AdoptionModel.find({ userId });
    let arr: any = [];
    ado.find((a: any) => {
      const isAdo = String(a.userId) === userId;
      arr.push(isAdo);
    });
    if (arr.includes(true)) {
      user.adoptions = user.adoptions.filter((a: any) => String(a) !== adoId);
      user.save();
      await AdoptionModel.findByIdAndDelete(adoId);
      req.flash("success", "Removed Success!");
      res.redirect("/");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.render("not-found", { error: "Something Wrong!" });
  }
};

//Pet Adoption Available
//verify Admin
export const availableAdoptionService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pet: any = await PetModel.findById(req.params.id);
    if (!pet.isAvailable) {
      await PetModel.findByIdAndUpdate(req.params.id, {
        $set: { isAvailable: true },
      });
      res.redirect("/admin/adoptons-form");
    }
    if (pet.isAvailable) {
      await PetModel.findByIdAndUpdate(req.params.id, {
        $set: { isAvailable: false },
      });
      res.redirect("/admin/adoptons-form");
    }
  } catch (error) {
    res.render("not-found", { error: "Something Wrong!" });
  }
};
