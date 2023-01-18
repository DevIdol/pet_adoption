import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import fs from "fs";
import Pet from "../models/PetModel.js";
import Donate from "../models/donationModel.js";
import PetArticle from "../models/PetArticleModel.js";
import { logger } from "../logger/Logger.js";
import { validationResult } from "express-validator";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
//
//export const homePageService = async(
//  req: Request,
//  res: Response,
//  next:NextFunction
//) => {
//  const pets = await Pet.find();
//  res.render("index",{pets:pets});
//}

export const homePageAdminService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  const pets = await Pet.find();
  res.render("admin-index", { pets: pets });
}

export const petFormService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {

  let pet = await Pet.find();
  res.render("pet-form",{errors:"",pet:pet,needed:""});
}

export const petUploadService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  try {
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
        isAvailable:req.body.ava
      }
      return res.render("pet-form", {
        errors: errors.array(),
        pet: pet,
        needed:'Choose an Image'
      });
 
    }
    const files = req.files;
    if (files?.length==0) {
      let pet = {
     
        name: req.body.name,
        breed: req.body.breed,
        age: req.body.age,
        size: req.body.size,
        sex: req.body.sex,
        kind: req.body.kind,
        description: req.body.description,
        isAvailable:req.body.ava
      }
      
      return res.render("pet-form", {
        errors: errors.array(),
        pet: pet,
        needed:'Choose an Image'
      });
 
    }
    // convert images to base64 encoding
    if (files) {
      let imgArray;
      if (Array.isArray(files)) {
        imgArray = files.map((file:any) => {
          let img = fs.readFileSync(file.path)
          return img.toString("base64");
        });
      } else {
        imgArray = Array.prototype.map.call(files, (file:any) => {
          let img = fs.readFileSync(file.path)
          return img.toString("base64");
        });
      } 
     let result= imgArray.map((src, index) => {
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
            kind:req.body.kind,
            description: req.body.description,
            isAvailable:req.body.ava
          }
          let newPet:any = new Pet(pet);
          return newPet
            .save()
            .then(() => {
            //return {msg:`${files[index].originalname} uploaded successfully`}
            // Add update here
              console.log("heeeke;kekejieieoei")
            })
        } else {
          res.send("not right")
        }
      })
      Promise.all(result)
        .then(msg => {
        res.redirect("/admin/pets")
          //res.json(msg)
        })
        .catch(err => {
          res.json(err);
      })
    }
    
  } catch (err: any) {
    res.redirect("/compose");
  }
  
}

// detail view 
export const petDetailService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
    try {
      const pet = await Pet.findById(req.params.id);
      if (!pet) {
        const error: any = Error("Not Found!");
        error.statusCode = 404;
        throw error;
      }
      res.render("pet-detail",{pet:pet})
    }
    catch (err:any) {
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

//delete
export const petDeleteService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  const requestedPetId = req.params.id;
  Pet.deleteOne({ _id: requestedPetId }, (err) => {
    if (!err) {
      res.redirect("/admin/pets");
    }
  })
}

// update form
export const petUpdateFormService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  const pet: any = await Pet.findById(req.params.id);
  if (!pet) {
    return res.render("error");
  }
  res.render("pet-update-form",{errors:"",pet:pet})
}

export const petUpdateService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  try {
    
    const pet: any = await Pet.findById(req.params.id);
   

    
    if (!pet) {
      const error: any = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    
    const files = req.files;
   
      if (files?.length===0) {
        pet.name = req.body.name;
         pet.breed = req.body.breed;
         pet.age = req.body.age;
         pet.size = req.body.size;
         pet.sex = req.body.sex;
         pet.kind = req.body.kind;
         pet.description = req.body.description;
         pet.isAvailable = req.body.ava;
          let newPet:any = new Pet(pet);
        await newPet.save()
        return res.redirect("/admin/pets/")
      }
    else  {
      let imgArray;
      if (Array.isArray(files)) {
        imgArray = files.map((file:any) => {
          let img = fs.readFileSync(file.path)
          return img.toString("base64");
        });
      } else {
        imgArray = Array.prototype.map.call(files, (file:any) => {
          let img = fs.readFileSync(file.path)
          return img.toString("base64");
        });
      } 
     let result= imgArray.map((src, index) => {
      
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
          let newPet:any = new Pet(pet);
          return newPet
            .save()
            .then(() => {
            return {msg:`${files[index].originalname} uploaded successfully`}
            })
        } else {
          res.send("not right")
        }
      })
      Promise.all(result)
        .then(() => {
          res.redirect("/admin/pets/")
        }
          //res.json(msg)
        )
        .catch(err => {
          res.json(err);
      })
    }
   
     
    //await pet.save();
    //return res.redirect("/admin/pets")

  
   
  } catch (err: any) {
    const pet: any = await Pet.findById(req.params.id);
    res.redirect("/admin/pets/" + pet._id + "/update");
  }
}
// Donation section
export const donateRequestService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  const donations =await Donate.find({});
  res.render("donation-request",{errors:"",donation:donations});
}
export const donateRequestDashboardService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  const donations =await Donate.find({});
  res.render("donate-dashboard", { donations: donations });
}

export const donateRequestCreateService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
      let donation = {
        itemName: req.body.itemName,
        quantity:req.body.quantity,
        description:req.body.description
      }
      return res.render("donation-request", {
        errors: errors.array(),
        donation: donation
      });
    }
    const donationCreate = {
      itemName: req.body.itemName,
      quantity: req.body.quantity,
      description:req.body.description
    }
    const newDonate = new Donate(donationCreate);
    await newDonate.save();
    res.redirect("/admin/pets/donate-dashboard");
  } catch (err: any) {
    res.redirect("/admin/pets/donate-request")
}
}

//delete

export const donationDeleteService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  const requestedId = req.params.id;
  Donate.deleteOne({ _id: requestedId }, (err) => {
    if (!err) {
      res.redirect("/admin/pets/donate-dashboard");
    }
  })
}

// update
export const donationUpdateFormService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  const donation = await Donate.findById(req.params.id);
  if (!donation) {
    res.render("error");
  }
  res.render("donate-update-form", {
    errors: "",
    donation:donation
  })
}

export const donationUpdateService = async(
  req: Request,
  res: Response,
  next:NextFunction
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
  return res.redirect("/admin/pets/donate-dashboard");
}



// Pet adoption article
export const petArticleFormService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  const article = PetArticle.find({});
  res.render("petarticle-admin-form", {
    errors: "",
    article:article
  })
}

export const petArticleDashboardService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  const articles = await PetArticle.find({});
  res.render("article-dashboard", { articles: articles });
}

export const petArticleService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
      let article = {
        category: req.body.category,
        title:req.body.title,
        description:req.body.description
      }
      return res.render("petarticle-admin-form", {
        errors: errors.array(),
        article: article
      });
    }
    const article = {
      category: req.body.category,
      title:req.body.title,
      description:req.body.description
    }
    const newArticle = new PetArticle(article);
    await newArticle.save();
    res.redirect("/admin/pets/article-dashboard");
  } catch (err: any) {
    res.redirect("/admin/pets/petarticle-create");
  }
}

export const petArticleDeleteService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  const requestedId = req.params.id;
  PetArticle.deleteOne({ _id: requestedId }, (err) => {
    if (!err) {
      res.redirect("/admin/pets/article-dashboard");
    }
  })
}

export const petArticelUpdateFormService = async(
  req: Request,
  res: Response,
  next:NextFunction
) => {
  const article = await PetArticle.findById(req.params.id);
  if (!article) {
    res.render("error");
  }
  res.render("article-update-form", {
    errors: "",
    article:article
  })
}

export const petArticleUpdateService = async(
  req: Request,
  res: Response,
  next:NextFunction
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
  res.redirect("/admin/pets/article-dashboard");
}