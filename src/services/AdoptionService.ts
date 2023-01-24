import { NextFunction, Request, Response } from "express";
import AdoptionModel from "../models/AdoptionModel";

export const AdoptionFormService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = req.user;
    let petId = req.body.petId;
    let adoption = await AdoptionModel.findOne({ petId: petId });
    let adoptionInfo = { userId: user._id, ...req.body };
    if (!adoption) {
      if (req.body.desc) {
        const newAdoption = new AdoptionModel(adoptionInfo);
        await newAdoption.save();
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
