import { Router } from "express";
import {
  addFavorite,
  getFavouritesByUserId,
  removeFavorite,
} from "../controllers/favouriteController";

const router = Router();

router.get("/test", (req, res) => res.send("Hello Favourite!"));
router.get("/:id", getFavouritesByUserId);
router.post("/", addFavorite);
router.delete("/:id", removeFavorite);

export default router;
