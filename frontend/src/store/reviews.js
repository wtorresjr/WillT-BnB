import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = "reviews/get-reviews";
const DELETE_USER_REVIEW = "reviews/delete-review";

const deleteReview = (deleteReviewId) => {
  return {
    type: DELETE_USER_REVIEW,
    deleteReviewId,
  };
};

const getSpotReviews = (spotIdReviews) => {
  return {
    type: GET_SPOT_REVIEWS,
    spotIdReviews,
  };
};

export const deleteMyReview = (reviewId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });
    const deletedReview = await response.json();
    console.log(response, "Deleted Review Data");
    dispatch(deleteReview(reviewId));
    // dispatch(getReviews())
    return deletedReview;
  } catch (error) {
    console.error("Error deleting review:", error);
  }
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
    case DELETE_USER_REVIEW:
      return { ...state, ...action.deleteReviewId };
      // return state;
    default:
      return state;
  }
};

export default reviewReducer;
