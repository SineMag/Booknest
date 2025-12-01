import { sql } from "../utils/database";

export interface Review {
  id?: number;
  starRatings: number;
  reviewer: string;
  reviewText: string;
  createdAt?: Date;
  userId: number;
  accomodationId: number;
}

export const createReviewTableQuery = () => sql`
  CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    starRatings INTEGER NOT NULL,
    reviewer VARCHAR(255) NOT NULL,
    reviewText TEXT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    userId INTEGER NOT NULL,
    accomodationId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)  ON DELETE CASCADE,
    FOREIGN KEY (accomodationId) REFERENCES accomodations(id)  ON DELETE CASCADE
  );
`;

export const getreviewsQuery = () => sql`
  SELECT * FROM reviews;
`;

export const getReviewByIdQuery = (id: number) => sql`
  SELECT * FROM reviews WHERE id=${id};
`;

export const createReviewQuery = (review: Review) => sql`
  INSERT INTO reviews (starRatings, reviewer, reviewText, userId, accomodationId)
  VALUES (${review.starRatings}, ${review.reviewer}, ${review.reviewText}, ${review.userId}, ${review.accomodationId}) RETURNING *;`;

export const updateReviewQuery = (id: number, review: Review) => sql`
  UPDATE reviews
  SET
    starRatings = ${review.starRatings},
    reviewer = ${review.reviewer},
    reviewText = ${review.reviewText}
  WHERE id = ${id} RETURNING *;
`;

export const deleteReviewQuery = (id: number) => sql`
  DELETE FROM reviews WHERE id=${id} RETURNING *;
`;

export const getReviewByUserId = (id: number) => sql`
  SELECT * FROM reviews WHERE userId=${id};
`;
