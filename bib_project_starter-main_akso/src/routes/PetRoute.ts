import express from "express";
import { store } from "../middlewares/multer.js";
import {  check } from 'express-validator';
import {
  petForm,
  petUpload,
  petDetail,
  petDelete,
  petUpdateForm,
  petUpdate,
  homePageAdmin
} from "../controllers/PetController.js";
//import { body, check } from "express-validator";

const router = express.Router();
router.route("/")
  .get(homePageAdmin)
  
router.route("/create")
  .get(petForm)
  .post(store.array("images", 12), [
    check("name").notEmpty().withMessage("name can't be empty"),
    check("breed").notEmpty().withMessage("breed can't be empty"),
    check("age").notEmpty().withMessage("age can't be empty"),
    check("size").notEmpty().withMessage("size can't be empty"),
    check("sex").notEmpty().withMessage("sex can't be empty"),
    check("description").notEmpty().withMessage("description can't be empty"),
    check("ava").notEmpty().withMessage("fill true/false in isAvailable"),
  ], petUpload)

router.route("/:id")
  .get(petDetail)
  .delete(petDelete)
  .put(store.array("images", 12), [
      check("name").notEmpty().withMessage("name can't be empty"),
      check("breed").notEmpty().withMessage("breed can't be empty"),
      check("age").notEmpty().withMessage("age can't be empty"),
      check("size").notEmpty().withMessage("size can't be empty"),
      check("sex").notEmpty().withMessage("sex can't be empty"),
      check("description").notEmpty().withMessage("description can't be empty"),
      check("ava").notEmpty().withMessage("fill true/false in isAvailable"),   
  ],petUpdate)
router.route("/:id/update")
  .get(petUpdateForm)
  


export default router;
