import express from "express";
import {
  homePageUser,
  allPets,
  petDetailUser,
  petCareTip
} from "../controllers/PetUserController.js";
const router = express.Router();

router.route("/")
  .get(homePageUser);

router.route("/all-pets")
  .get(allPets);
router.route("/petcare-tips")
.get(petCareTip)
router.route("/pets/:id")
  .get(petDetailUser)


export default router;