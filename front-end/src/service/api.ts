import axios from "axios";

export const getFavorites = () => axios.get("/favorites");

export const addFavorite = (hotelId: number) =>
  axios.post("/favorites", { hotelId });

export const removeFavorite = (hotelId: number) =>
  axios.delete(`/favorites/${hotelId}`);

export const toggleFavorite = async (hotelId: number, isLiked: boolean) => {
  if (isLiked) {
    return removeFavorite(hotelId);
  }
  return addFavorite(hotelId);
};

export const getUserDetails = () => axios.get("/user/details");

export const updateUserDetails = async (userId: number, payload: any) => {
  return api.put(`/users/${userId}`, payload);
};

// Review API functions
export const getAllReviews = () => api.get("/reviews");

export const getReviewsByAccommodationId = (accommodationId: number) => 
  api.get(`/reviews/accommodation/${accommodationId}`);

export const createReview = (reviewData: any) => 
  api.post("/reviews", reviewData);

const api = axios.create({
  baseURL: "https://booknestapi.netlify.app/", 
  headers: {},
});