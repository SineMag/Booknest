import type { Request, Response } from "express";
import type { Favourite } from "../models/Favourite";
import {
  addFavouritesDB,
  removeFavouritesDB,
  selectFavouritesByUserIdDB,
} from "../services/favouriteService";

export const addFavourites = async (req: Request, res: Response) => {
  try {
    const favourite = req.body as Favourite;
    const newFavourite = await addFavouritesDB(favourite);
    res.status(201).json(newFavourite);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", message: error });
  }
};

export const removeFavourites = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const newFavourite = await removeFavouritesDB(id);
    res.status(201).json(newFavourite);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", message: error });
  }
};

export const getFavouritesByUserId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const favourites = await selectFavouritesByUserIdDB(id);
    res.status(200).json(favourites);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", message: error });
  }
};
