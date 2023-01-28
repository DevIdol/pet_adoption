import express from "express";
import { store } from "../middlewares/multer.js";
import {
  petGet,
  petUpload,
  petDelete,
  petUpdate
} from "../controllers/PetController.js";
import { check } from "express-validator";
const router = express.Router();

router.route("/pets")
.get(petGet)
.post(
  store.array("images", 1200),
  [
    check("name").notEmpty().withMessage("name can't be empty"),
    check("breed").notEmpty().withMessage("breed can't be empty"),
    check("age").notEmpty().withMessage("age can't be empty"),
    check("size").notEmpty().withMessage("size can't be empty"),
    check("sex").notEmpty().withMessage("sex can't be empty"),
    check("description").notEmpty().withMessage("description can't be empty")
  ],
  petUpload
);

router
  .route("/pets/:id")
  .delete(petDelete)
  .put(
    store.array("images", 1200),
    petUpdate
  );
export default router;