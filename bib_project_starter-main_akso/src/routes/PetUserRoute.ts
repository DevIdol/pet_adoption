import express from "express";
import {
  homePageUser,
  allPets,
  petDetailUser,
  petCareTip,
  catTrainingTip,
  dogTrainingTip,
  donationUser,
  dogApodtArticle,
  catAdoptArticle,
  allCats,
  allDogs,
  allOther
} from "../controllers/PetUserController.js";
const router = express.Router();

router.route("/")
  .get(homePageUser);

router.route("/all-pets")
  .get(allPets);
router.route("/cats")
  .get(allCats)
router.route("/dogs")
  .get(allDogs)
router.route("/other")
.get(allOther)
router.route("/petcare-tips")
  .get(petCareTip)

router.route("/donation-requests")
.get(donationUser)
  

router.route("/training-tips/dog-training-tips")
  .get(dogTrainingTip)

router.route("/dog-adopt-article")
  .get(dogApodtArticle)

router.route("/cat-adopt-article")
  .get(catAdoptArticle)
  router.route("/training-tips/cat-training-tips")
  .get(catTrainingTip)
router.route("/pets/:id")
  .get(petDetailUser)


export default router;