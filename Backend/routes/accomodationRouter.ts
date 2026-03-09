import { Router } from "express";
import {
  createAccomodation,
  deleteAccomodation,
  getAccomodationById,
  getAllAccomodations,
  updateAccomodation,
} from "../controllers/accomodationController";

const router = Router();

router.get("/test", (req, res) => res.send("Hello Accomodation!"));
router.get("/", getAllAccomodations);
router.get("/:id", getAccomodationById);
router.post("/", createAccomodation);
router.put("/:id", updateAccomodation);
router.delete("/:id", deleteAccomodation);

export default router;
