import express from "express";
import { check } from "express-validator";
import {
  petArticleGet,
  petArticle
} from "../controllers/ArticleController.js";
const router = express.Router();

router.route("/articles")
  .get(petArticleGet)
  .post(
    [
      check("category").notEmpty().withMessage("Category can't be empty"),
      check("title").notEmpty().withMessage("Title can't be empty"),
      check("description").notEmpty().withMessage("Description can't be empty"),
    ],
    petArticle
  );

export default router;