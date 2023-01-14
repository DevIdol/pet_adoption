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
  homePageAdmin,
  donateRequest,
  donateRequestCreate,
  donateRequestDashboard,
  donationDelete,
  donationUpdateForm,
  donationUpdate
} from "../controllers/PetController.js";
//import { body, check } from "express-validator";

const router = express.Router();
router.route("/")
  .get(homePageAdmin)
router.route("/donate-request")
  .get(donateRequest)
  .post([
    check("itemName").notEmpty().withMessage("Item name can't be empty"),
    check("quantity").notEmpty().withMessage("Quantity can't be empty")
      .matches(/^[0-9]{0,4}$/g).withMessage("Type number 1 to 4 digits"),
    check("description").notEmpty().withMessage("Description can't be empty")
  ], donateRequestCreate)

// donate-request routes
router.route("/donate-dashboard")
  .get(donateRequestDashboard)

  router.route("/donate-dashboard/:id")
  .delete(donationDelete)
  .put(donationUpdate)

router.route("/donate-dashboard/:id/update")
  .get(donationUpdateForm)
  
  
// pet routes
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
