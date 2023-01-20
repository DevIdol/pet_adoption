import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import fs from "fs";
import Pet from "../models/PetModel.js";
import Donate from "../models/DonationModel.js";
import PetArticle from "../models/PetArticleModel.js";
import { logger } from "../logger/Logger.js";
import { validationResult } from "express-validator";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());

export const petFormService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  let pet = await Pet.find();
  res.render("pet-form", { errors: "", pet: pet, needed: "", user });
};

export const petUploadService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let pet = {
        name: req.body.name,
        breed: req.body.breed,
        age: req.body.age,
        size: req.body.size,
        sex: req.body.sex,
        kind: req.body.kind,
        description: req.body.description,
        isAvailable: req.body.ava,
      };
      return res.render("pet-form", {
        errors: errors.array(),
        pet: pet,
        needed: "Choose an Image",
        user,
      });
    }
    const files = req.files;
    if (files?.length == 0) {
      let pet = {
        name: req.body.name,
        breed: req.body.breed,
        age: req.body.age,
        size: req.body.size,
        sex: req.body.sex,
        kind: req.body.kind,
        description: req.body.description,
        isAvailable: req.body.ava,
      };

      return res.render("pet-form", {
        errors: errors.array(),
        pet: pet,
        needed: "Choose an Image",
        user,
      });
    }
    // convert images to base64 encoding
    if (files) {
      let imgArray;
      if (Array.isArray(files)) {
        imgArray = files.map((file: any) => {
          let img = fs.readFileSync(file.path);
          return img.toString("base64");
        });
      } else {
        imgArray = Array.prototype.map.call(files, (file: any) => {
          let img = fs.readFileSync(file.path);
          return img.toString("base64");
        });
      }
      let result = imgArray.map((src, index) => {
        let pet;
        if (Array.isArray(files) && files[index]) {
          pet = {
            filename: files[index].originalname,
            contentType: files[index].mimetype,
            imageBase64: src,
            name: req.body.name,
            breed: req.body.breed,
            age: req.body.age,
            size: req.body.size,
            sex: req.body.sex,
            kind: req.body.kind,
            description: req.body.description,
            isAvailable: req.body.ava,
          };
          let newPet: any = new Pet(pet);
          return newPet.save().then(() => {});
        } else {
          res.send("not right");
        }
      });
      Promise.all(result)
        .then((msg) => {
          res.redirect("/admin/pet-table");
        })
        .catch((err) => {
          res.json(err);
        });
    }
  } catch (err: any) {
    res.redirect("/");
  }
};

// detail view
export const petDetailService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const pet = await Pet.findById(req.params.id);
      if (!pet) {
        const error: any = Error("Not Found!");
        error.statusCode = 404;
        throw error;
      }
      res.render("pet-detail", { pet: pet, token });
    } catch (err: any) {
      logger.error("GET Post with id API Error");
      logger.error(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res
        .status(404)
        .json({ message: "GET Post with id API Error", status: 0 });
    }
  }
};

//delete
export const petDeleteService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestedPetId = req.params.id;
  Pet.deleteOne({ _id: requestedPetId }, (err) => {
    if (!err) {
      res.redirect("/admin/pet-table");
    }
  });
};

// update form
export const petUpdateFormService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const pet: any = await Pet.findById(req.params.id);
  if (!pet) {
    res.render("not-found", { message: "Page Not Found" });
  }
  res.render("pet-update", { errors: "", pet: pet, user });
};

export const petUpdateService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pet: any = await Pet.findById(req.params.id);

    if (!pet) {
      const error: any = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }

    const files = req.files;

    if (files?.length === 0) {
      pet.name = req.body.name;
      pet.breed = req.body.breed;
      pet.age = req.body.age;
      pet.size = req.body.size;
      pet.sex = req.body.sex;
      pet.kind = req.body.kind;
      pet.description = req.body.description;
      pet.isAvailable = req.body.ava;
      let newPet: any = new Pet(pet);
      await newPet.save();
      return res.redirect("/admin/pet-table");
    } else {
      let imgArray;
      if (Array.isArray(files)) {
        imgArray = files.map((file: any) => {
          let img = fs.readFileSync(file.path);
          return img.toString("base64");
        });
      } else {
        imgArray = Array.prototype.map.call(files, (file: any) => {
          let img = fs.readFileSync(file.path);
          return img.toString("base64");
        });
      }
      let result = imgArray.map((src, index) => {
        if (Array.isArray(files) && files[index]) {
          //const pet: any = Pet.findById(req.params.id);

          pet.filename = files[index].originalname;
          pet.contentType = files[index].mimetype;
          pet.imageBase64 = src;
          pet.name = req.body.name;
          pet.breed = req.body.breed;
          pet.age = req.body.age;
          pet.size = req.body.size;
          pet.sex = req.body.sex;
          pet.kind = req.body.kind;
          pet.description = req.body.description;
          pet.isAvailable = req.body.ava;
          let newPet: any = new Pet(pet);
          return newPet.save().then(() => {
            return {
              msg: `${files[index].originalname} uploaded successfully`,
            };
          });
        } else {
          res.send("not right");
        }
      });
      Promise.all(result)
        .then(
          () => {
            res.redirect("/admin/pet-table");
          }
          //res.json(msg)
        )
        .catch((err) => {
          res.json(err);
        });
    }
  } catch (err: any) {
    res.redirect("/admin/pet-table");
  }
};
// Donation section
export const donateRequestService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const donations = await Donate.find({});
  res.render("donation-request", { errors: "", donation: donations, user });
};


export const donateRequestCreateService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let donation = {
        itemName: req.body.itemName,
        quantity: req.body.quantity,
        description: req.body.description,
      };
      return res.render("donation-request", {
        errors: errors.array(),
        donation: donation,
        user,
      });
    }
    const donationCreate = {
      itemName: req.body.itemName,
      quantity: req.body.quantity,
      description: req.body.description,
    };
    const newDonate = new Donate(donationCreate);
    await newDonate.save();
    res.redirect("/admin/article-table");
  } catch (err: any) {
    res.redirect("/admin/article-table");
  }
};

//delete

export const donationDeleteService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestedId = req.params.id;
  Donate.deleteOne({ _id: requestedId }, (err) => {
    if (!err) {
      res.redirect("/admin/donation-table");
    }
  });
};

// update
export const donationUpdateFormService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const donation = await Donate.findById(req.params.id);
  if (!donation) {
    res.render("error");
  }
  res.render("donation-update", {
    errors: "",
    donation: donation,
    user,
  });
};

export const donationUpdateService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const donation = await Donate.findById(req.params.id);

  if (!donation) {
    const error: any = new Error("Not Found!");
    error.statusCode = 404;
    throw error;
  }
  donation.itemName = req.body.itemName;
  donation.quantity = req.body.quantity;
  donation.description = req.body.description;
  let newDonation = new Donate(donation);
  newDonation.save();
  return res.redirect("/admin/donation-table");
};

// Pet adoption article
export const petArticleFormService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const article = PetArticle.find();
  res.render("petarticle-form", {
    errors: "",
    article: article,
    user,
  });
};

export const petArticleService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let article = {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
      };
      return res.render("petarticle-form", {
        errors: errors.array(),
        article: article,
        user,
      });
    }
    const article = {
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
    };
    const newArticle = new PetArticle(article);
    await newArticle.save();
    res.redirect("/admin/article-table");
  } catch (err: any) {
    res.redirect("/admin/article-table");
  }
};

export const petArticleDeleteService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestedId = req.params.id;
  PetArticle.deleteOne({ _id: requestedId }, (err) => {
    if (!err) {
      res.redirect("/admin/article-table");
    }
  });
};

export const petArticelUpdateFormService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  const article = await PetArticle.findById(req.params.id);
  if (!article) {
    res.render("error");
  }
  res.render("article-update", {
    errors: "",
    article: article,
    user,
  });
};

export const petArticleUpdateService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const article = await PetArticle.findById(req.params.id);
  if (!article) {
    const error: any = new Error("Not Found!");
    error.statusCode = 404;
    throw error;
  }
  article.category = req.body.category;
  article.title = req.body.title;
  article.description = req.body.description;
  let newArticle = new PetArticle(article);
  newArticle.save();
  res.redirect("/admin/article-table");
};
