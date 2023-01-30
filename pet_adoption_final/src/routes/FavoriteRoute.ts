import express, { Router } from "express";
import { createFavorite, deleteFavorite } from '../controllers/FavoriteController';


const favoriteRoute: Router = express.Router()


favoriteRoute.post('/:id', createFavorite)

favoriteRoute.delete('/:id', deleteFavorite)

export default favoriteRoute