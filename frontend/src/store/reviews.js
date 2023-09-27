import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = "reviews/get-reviews";

const getSpotReviews = (spotIdReviews) => {
  return {
    type: GET_SPOT_REVIEWS,
    spotIdReviews,
  };
};

export const getReviews = (id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${id}/reviews`);
    const foundReviews = await response.json();
    dispatch(getSpotReviews(foundReviews));

    return foundReviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SPOT_REVIEWS:
      return {
        ...state,
        ...action.spotIdReviews,
      };
    default:
      return state;
  }
};

export default reviewReducer;
