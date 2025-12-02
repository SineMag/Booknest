import { Router } from "express";
import {
  addFavourites,
  getFavouritesByUserId,
  removeFavourites,
} from "../controllers/favouriteController";

const router = Router();

router.get("/test", (req, res) => res.send("Hello Favourite!"));
router.get("/user/:id", getFavouritesByUserId);
router.post("/", addFavourites);
router.delete("/:id", removeFavourites);

export default router;
