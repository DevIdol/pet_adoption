import { NextFunction, Request, Response} from "express";
import Pet from "../models/PetModel.js";
import { validationResult } from "express-validator";
import fs from "fs";
import { logger } from "../logger/Logger.js";

//get
export const petGetService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let pet = await Pet.find({});
    res.json({
      data: pet,
      status: 1
    });
  }catch (err: any) {
    logger.error('GET Pet API Error');
    logger.error(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    res.status(403).json({ message: 'GET Pet API Error', status: 1 });
  }

};

//post
export const petUploadService = async (
  req: Request,
  res: Response,
  next:NextFunction
) => {
  try {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const files = req.files;
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
            isAvailable: req.body.isAvailable,
          };
          let newPet: any = new Pet(pet);
          return newPet.save();
        } else {
          res.send("not right");
        }
      });
      Promise.all(result)
      .then((msg) => {
        res.json({ data: msg })

      })
      .catch((err) => {
        res.json(err);
      });
    }
  } catch (err: any) {
    res.json(err);
  }
};

//update
export const petUpdateService = async (
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
//    const update = req.body;
//    if (!update.name) {
//      update.name = pet.name;
//    }
//    if (!update.filename) {
//      update.filename=pet.filename
//    }
//
//      if (!update.contentType) {
//      update.contentType=pet.contentType
//      }
//       if (!update.imageBase64) {
//      update.imageBase64=pet.imageBase64
//    }
//    if (!update.breed) {
//      update.breed = pet.breed;
//    }
//    if (!update.age) {
//      update.age = pet.age;
//    }
//    if (!update.size) {
//      update.size = pet.size;
//    }
//    if (!update.sex) {
//      update.sex=pet.sex
//    }
//    if (!update.kind) {
//      update.kind=pet.kind
//    }
//    if (!update.description) {
//      update.description=pet.description
//    }
//    if (!update.isAvailable) {
//      update.isAvailable=pet.isAvailable
//    }
//    await Pet.findByIdAndUpdate(req.params.id, update, { new: true });
//    res.json({ data: pet });
    
    const files = req.files;
    if (files?.length === 0) {
      if (!req.body.name){
        req.body.name = pet.name;
        console.log(req.body.name);
      }
      if (!req.body.breed) {
        req.body.breed = pet.breed;
      }
      if (!req.body.age) {
        req.body.age = pet.age;
      }
      if (!req.body.size) {
        req.body.size = pet.size;
      }
      if (!req.body.sex) {
        req.body.sex = pet.sex;
      }
      if (!req.body.kind) {
        req.body.kind = pet.kind;
      }
      if (!req.body.description) {
        req.body.description = pet.description;
      }
      if (!req.body.isAvailable) {
        req.body.isAvailable = pet.isAvailable;
      }
      console.log(req.body.name)
      pet.name = req.body.name;
      pet.breed = req.body.breed;
      pet.age = req.body.age;
      pet.size = req.body.size;
      pet.sex = req.body.sex;
      pet.kind = req.body.kind;
      pet.description = req.body.description;
      pet.isAvailable = req.body.isAvailable;
      let newPet: any = new Pet(pet);
      await newPet.save();
      res.json({ data: pet });
    }
    else{
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
          if (!req.body.name){
            req.body.name = pet.name;
          }
          if (!req.body.breed) {
            req.body.breed = pet.breed;
          }
          if (!req.body.age) {
            req.body.age = pet.age;
          }
          if (!req.body.size) {
            req.body.size = pet.size;
          }
          if (!req.body.sex) {
            req.body.sex = pet.sex;
          }
          if (!req.body.kind) {
            req.body.kind = pet.kind;
          }
          if (!req.body.description) {
            req.body.description = pet.description;
          }
          if (!req.body.isAvailable) {
            req.body.isAvailable = pet.isAvailable;
          }
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
          pet.isAvailable = req.body.isAvailable;
          let newPet: any = new Pet(pet);
          return  newPet.save();
        } else {
          res.send("not right");
        }
      });
      Promise.all(result)
      .then((msg) => {
        res.json({ data: msg })

      })
      .catch((err) => {
        res.json(err);
      });
    }
  } catch (err: any) {
    res.json(err);
  }
};

//delete
export const petDeleteService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestedPetId = req.params.id;
    Pet.findById(requestedPetId, (err: any, item: any) => {
      if (err) console.log("error");
      Pet.deleteOne({ _id: requestedPetId }, (err) => {
        if (!err) {
          res.json({ data: `${item.name} Deleted successfully`, status: 1 })
        }
      });
    });
    
  }catch (err: any) {
    logger.error('Delete Pet API Error');
    logger.error(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    res.status(403).json({ data: 'Delete Pet API Error', status: 1 });
  }
};