import {
  addFavouritesQuery,
  getFavouriteByUserIdQuery,
  removeFavouriteQuery,
  type Favourite,
} from "../models/Favourite";

export const selectFavouritesByUserIdDB = async (id: number) => {
  const result = await getFavouriteByUserIdQuery(id);
  return result;
};

export const addFavouritesDB = async (favourite: Favourite) => {
  const result = await addFavouritesQuery(favourite);
  return result;
};

export const removeFavouriteDB = async (id: number) => {
  const result = await removeFavouriteQuery(id);
  return result;
};
