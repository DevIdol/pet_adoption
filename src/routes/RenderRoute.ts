import express, { Router, Request, Response, NextFunction } from "express";
import User from "../models/UserModel";
import { isAdmin, isUser } from "../middlewares/IsAuth";
import PetModel from "../models/PetModel";
import DonationModel from "../models/DonationModel";
import PetArticleModel from "../models/PetArticleModel";
import FavoriteModel from "../models/FavoriteModel";
import jwtDecode from "jwt-decode";
import AdoptionModel from "../models/AdoptionModel";

const renderRoute: Router = express.Router();

//show home
renderRoute.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.access_token;
    let user: any;
    if (token) {
      const decoded: any = jwtDecode(token);
      user = decoded.user;
    }
    const favorites: any = await FavoriteModel.find({ userId: user._id }).populate(
      "pets"
    );
    await User.findById(user._id).populate("favorites");
    const pets = await PetModel.find();
    const latestPets = await PetModel.find()
      .sort({ $natural: -1 })
      .limit(4)
      .exec();
    if (!pets) {
      res.render("not-found", { error: "No Pet" });
    }
    const first4pets = pets.slice(0, 4);
    res.render("index", {
      pets: pets,
      favorites,
      first3pets: first4pets,
      latestPets: latestPets,
      token,
      user,
    });
  }
);

//show register form
renderRoute.get(
  "/register",
  (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.access_token;
    !token && res.render("register");
    token && res.redirect("/");
  }
);

//show login form
renderRoute.get("/login", (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies.access_token;
  !token && res.render("login");
  token && res.redirect("/");
});

//show forgot-password
renderRoute.get(
  "/forgot-password",
  (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.access_token;
    if (!token) {
      res.render("forgot-password");
    } else {
      res.render("not-found", { error: "Page Not Found!" });
    }
  }
);

//show favorite page
renderRoute.get(
  "/favorites",
  isUser,
  async (req: Request, res: Response, next: NextFunction) => {
    const user: any = req.user;
    let token = req.cookies.access_token;
    try {
      const fav: any = await FavoriteModel.find({ userId: user._id }).populate(
        "pets"
      );
      await User.findById(user._id).populate("favorites");
      res.render("favorite", { user, token, favorites: fav });
    } catch (error) {
      res.render("not-found", { error: "Something Wrong!" });
    }
  }
);

// show manage account
renderRoute.get(
  "/personal-info",
  isUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.access_token;
      const user: any = req.user;
      const users = await User.findById(user._id);
      res.render("personal-info", { user: users, token });
    } catch (error) {
      res.render("not-found", { error: "Something Wrong!" });
    }
  }
);

// show setting
renderRoute.get(
  "/setting",
  isUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.access_token;
      const user: any = req.user;
      const users = await User.findById(user._id);
      res.render("setting", { user: users, token });
    } catch (error) {
      res.render("not-found", { error: "Something Wrong!" });
    }
  }
);

//show dashboard
renderRoute.get(
  "/admin",
  isAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    const user = req.user;
    const users = await User.find();
    const pets = await PetModel.find();
    const articles = await PetArticleModel.find();
    const donation = await DonationModel.find();
    res.render("admin", { user, users, pets, articles, donation, token });
  }
);

//show pet table
renderRoute.get(
  "/admin/pet-table",
  isAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    const user = req.user;
    const pets = await PetModel.find();
    res.render("pet-table", { user, pets, token });
  }
);

//show aritcle table
renderRoute.get(
  "/admin/article-table",
  isAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    const user = req.user;
    const articles = await PetArticleModel.find();
    res.render("article-table", { user, articles, token });
  }
);

//show donation table
renderRoute.get(
  "/admin/donation-table",
  isAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    const user = req.user;
    const donations = await DonationModel.find();
    res.render("donation-table", { user, donations, token });
  }
);

//show pets
renderRoute.get(
  "/pets",
  async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.access_token;
    let user: any;
    if (token) {
      const decoded: any = jwtDecode(token);
      user = decoded.user;
    }
    const kind = req.query.kind;
    let pets;
    if (kind) {
      pets = await PetModel.find({ kind });
    } else {
      pets = await PetModel.find();
    }
    res.render("pets", { token, pets, user });
  }
);

//Request Donation
renderRoute.get(
  "/donation-requests",
  async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.access_token;
    let user: any;
    if (token) {
      const decoded: any = jwtDecode(token);
      user = decoded.user;
    }
    const requests = await DonationModel.find();
    res.render("request-donation", { requests: requests, token, user });
  }
);

//Pet Care Tip
renderRoute.get(
  "/petcare-tips",
  (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.access_token;
    let user: any;
    if (token) {
      const decoded: any = jwtDecode(token);
      user = decoded.user;
    }
    res.render("petcare-tips", { token, user });
  }
);

//Training Tip
renderRoute.get(
  "/training-tips/cat-training-tips",
  (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.access_token;
    let user: any;
    if (token) {
      const decoded: any = jwtDecode(token);
      user = decoded.user;
    }
    res.render("training-tip-cat", { token, user });
  }
);

renderRoute.get(
  "/training-tips/dog-training-tips",
  (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.access_token;
    let user: any;
    if (token) {
      const decoded: any = jwtDecode(token);
      user = decoded.user;
    }
    res.render("training-tip-dog", { token, user });
  }
);

//Pet Article User
renderRoute.get(
  "/articles",
  async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.access_token;
    let user: any;
    if (token) {
      const decoded: any = jwtDecode(token);
      user = decoded.user;
    }
    const category = req.query.category;
    let articles: any;
    if (category) {
      articles = await PetArticleModel.find({ category });
    }
    const cats = articles.filter((cat: any) => cat.category === "dog");
    const catDog = cats.map((cat: any) => cat.category);
    const dogCat: any = new Set(catDog);
    let dog: any;
    dogCat.forEach((d: any) => {
      dog = d;
    });
    res.render("articles", {
      dog,
      articles,
      token,
      user,
    });
  }
);

//show adoption form list
renderRoute.get(
  "/adoption-form",
  isUser,
  async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.access_token;
    const user: any = req.user;
    const adoptions = await AdoptionModel.find({ userId: user._id }).populate(
      "petId"
    );
    res.render("adoption-form", { user, token, adoptions });
  }
);

export default renderRoute;
