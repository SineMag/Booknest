import type { Request, Response } from "express";
import {
  createReviewDB,
  deleteReviewDB,
  selectAllReviews,
  selectReviewById,
  selectReviewByUserId,
  updateReviewDB,
} from "../services/reviewService";
import { log } from "console";

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await selectAllReviews();
    return res.status(200).json(reviews);
  } catch (error) {
    log(error);
  }
};

export const getReviewsByUserId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const reviews = await selectReviewByUserId(id);
    return res.status(200).json(reviews);
  } catch (error) {
    log(error);
  }
};

export const getReviewsById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const reviews = await selectReviewById(id);
    return res.status(200).json(reviews);
  } catch (error) {
    log(error);
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const review = req.body;
    const newReview = await createReviewDB(review);
    return res.status(201).json(newReview);
  } catch (error) {
    log(error);
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const review = req.body;
    const updatedReview = await updateReviewDB(id, review);
    return res.status(200).json(updatedReview);
  } catch (error) {
    log(error);
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await deleteReviewDB(id);
    return res.sendStatus(204);
  } catch (error) {
    log(error);
  }
};
