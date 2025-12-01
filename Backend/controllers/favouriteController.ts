import type { Request, Response } from "express";
import {
  addFavouritesDB,
  removeFavouriteDB,
  selectFavouritesByUserIdDB,
} from "../services/favouriteService";
import type { Favourite } from "../models/Favourite";

export const getFavouritesByUserId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const favourites = await selectFavouritesByUserIdDB(id);
    res.status(200).json(favourites);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addFavorite = async (req: Request, res: Response) => {
  try {
    const newFav = req.body as Favourite;
    const favourite = await addFavouritesDB(newFav);
    res.status(201).json(favourite);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const favourite = await removeFavouriteDB(id);
    res.status(200).json(favourite);
  } catch (error) {
    res.status(500).json(error);
  }
};
