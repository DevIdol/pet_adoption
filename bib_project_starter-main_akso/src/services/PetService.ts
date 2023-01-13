import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import fs from "fs";
import Pet from "../models/PetModel.js";
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
      console.log(pet);
      console.log(errors.array());
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
      console.log(pet);
      console.log(errors.array());
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
            return {msg:`${files[index].originalname} uploaded successfully`}
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
    console.log(pet.name);
    
    if (!pet) {
      const error: any = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    
    const files = req.files;
    console.log(files);
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
         console.log(pet.name);
      
         pet.filename = files[index].originalname;
         console.log(pet.filename);
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