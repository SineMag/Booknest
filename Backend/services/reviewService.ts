import {
  createReviewQuery,
  deleteReviewQuery,
  getReviewByIdQuery,
  getReviewByUserId,
  getReviewsByAccomodationIdQuery,
  getreviewsQuery,
  updateReviewQuery,
} from "../models/Review";

export const selectAllReviews = async () => {
  const reviews = await getreviewsQuery();
  return reviews;
};

export const selectReviewById = async (id: number) => {
  const review = await getReviewByIdQuery(id);
  return review;
};

export const selectReviewByUserId = async (id: number) => {
  const review = await getReviewByUserId(id);
  return review;
};

export const createReviewDB = async (review: any) => {
  const result = await createReviewQuery(review);
  return result;
};

export const updateReviewDB = async (id: number, review: any) => {
  const result = await updateReviewQuery(id, review);
  return result;
};

export const deleteReviewDB = async (id: number) => {
  const result = await deleteReviewQuery(id);
  return result;
};

export const selectReviewByAccomodationId = async (id: number) => {
  const reviews = await getReviewsByAccomodationIdQuery(id);
  return reviews;
};
