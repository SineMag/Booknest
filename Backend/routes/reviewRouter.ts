import { Router } from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewsById,
  getReviewsByUserId,
  updateReview,
} from "../controllers/reviewController";

const router = Router();

router.get("/test", (req, res) => res.send("Hello Service!"));
router.get("/", getAllReviews);
router.get("/:id", getReviewsById);
router.get("/user/:id", getReviewsByUserId);
router.post("/", createReview);
router.put("/", updateReview);
router.delete("/", deleteReview);

export default router;
