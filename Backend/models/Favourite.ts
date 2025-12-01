import { sql } from "../utils/database";

export interface Favourite {
  id?: number;
  userId: number;
  accommodationId: number;
}

export const createFavouriteTableQuery = () => sql`
CREATE TABLE IF NOT EXISTS favourites (
  id SERIAL PRIMARY KEY,
  userId INTEGER NOT NULL,
  accommodationId INTEGER NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)  ON DELETE CASCADE,
  FOREIGN KEY (accommodationId) REFERENCES accomodations(id) ON DELETE CASCADE
);
`;

export const getFavouriteByUserIdQuery = (id: number) => sql`
  SELECT * FROM favourites WHERE userId=${id};
`;

export const addFavouritesQuery = (favourite: Favourite) => sql`
  INSERT INTO favourites (userId, accommodationId) VALUES (${favourite.userId}, ${favourite.accommodationId}) RETURNING *;
`;

export const removeFavouriteQuery = (id: number) => sql`
  DELETE FROM favourites WHERE id=${id} RETURNING *;
`;
