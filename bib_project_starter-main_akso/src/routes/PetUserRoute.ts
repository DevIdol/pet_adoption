import express from "express";
import {
  homePageUser,
  allPets,
  petDetailUser,
  petCareTip,
  catTrainingTip,
  dogTrainingTip,
  donationUser
} from "../controllers/PetUserController.js";
const router = express.Router();

router.route("/")
  .get(homePageUser);

router.route("/all-pets")
  .get(allPets);
router.route("/petcare-tips")
  .get(petCareTip)

router.route("/donation-requests")
.get(donationUser)
  

router.route("/training-tips/dog-training-tips")
  .get(dogTrainingTip)

  router.route("/training-tips/cat-training-tips")
  .get(catTrainingTip)
router.route("/pets/:id")
  .get(petDetailUser)


export default router;