import {
  addFavouriteQuery,
  removeFavouriteQuery,
  selectFavouritesByUserIdQuery,
  type Favourite,
} from "../models/Favourite";

export const addFavouritesDB = async (favourite: Favourite) => {
  const result = await addFavouriteQuery(favourite);
  return result;
};

export const removeFavouritesDB = async (id: number) => {
  const result = await removeFavouriteQuery(id);
  return result;
};

export const selectFavouritesByUserIdDB = async (userId: number) => {
  const result = await selectFavouritesByUserIdQuery(userId);
  return result;
};
