import express from "express";
import { store } from "../middlewares/multer.js";
import { check } from "express-validator";
import {
  petForm,
  petUpload,
  petDetail,
  petDelete,
  petUpdateForm,
  petUpdate,
  donateRequest,
  donateRequestCreate,
  donationDelete,
  donationUpdateForm,
  donationUpdate,
  petArticleForm,
  petArticle,
  petArticleDelete,
  petArticelUpdateForm,
  petArticleUpdate,
} from "../controllers/PetController.js";

const router = express.Router();

//show pet form and create
router
  .route("/pets/create")
  .get(petForm)
  .post(
    store.array("images", 12),
    [
      check("name").notEmpty().withMessage("name can't be empty"),
      check("breed").notEmpty().withMessage("breed can't be empty"),
      check("age").notEmpty().withMessage("age can't be empty"),
      check("size").notEmpty().withMessage("size can't be empty"),
      check("sex").notEmpty().withMessage("sex can't be empty"),
      check("description").notEmpty().withMessage("description can't be empty"),
      check("ava").notEmpty().withMessage("fill true/false in isAvailable"),
    ],
    petUpload
  );

//pet update and delete
router
  .route("/pets/:id")
  .get(petDetail)
  .delete(petDelete)
  .put(
    store.array("images", 1200),
    [
      check("name").notEmpty().withMessage("name can't be empty"),
      check("breed").notEmpty().withMessage("breed can't be empty"),
      check("age").notEmpty().withMessage("age can't be empty"),
      check("size").notEmpty().withMessage("size can't be empty"),
      check("sex").notEmpty().withMessage("sex can't be empty"),
      check("description").notEmpty().withMessage("description can't be empty"),
      check("ava").notEmpty().withMessage("fill true/false in isAvailable"),
    ],
    petUpdate
  );
router.route("/pets/edit/:id").get(petUpdateForm);

//show donation form and  create
router
  .route("/donate-request/create")
  .get(donateRequest)
  .post(
    [
      check("itemName").notEmpty().withMessage("Item name can't be empty"),
      check("quantity")
        .notEmpty()
        .withMessage("Quantity can't be empty")
        .matches(/^[0-9]{0,4}$/g)
        .withMessage("Type number 1 to 4 digits"),
      check("description").notEmpty().withMessage("Description can't be empty"),
    ],
    donateRequestCreate
  );

//donation delete and update
router.route("/donations/:id").delete(donationDelete).put(donationUpdate);
router.route("/donations/edit/:id").get(donationUpdateForm);

//show article form and create
router
  .route("/pet-article/create")
  .get(petArticleForm)
  .post(
    [
      check("category").notEmpty().withMessage("Category can't be empty"),
      check("title").notEmpty().withMessage("Title can't be empty"),
      check("description").notEmpty().withMessage("Description can't be empty"),
    ],
    petArticle
  );

//article update and delete
router.route("/articles/:id").delete(petArticleDelete).put(petArticleUpdate);
router.route("/articles/edit/:id").get(petArticelUpdateForm);

export default router;
