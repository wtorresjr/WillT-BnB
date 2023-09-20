import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/getAll";

const loadAllSpots = (allspots) => {
  return {
    type: GET_ALL_SPOTS,
    allspots,
  };
};

export const fetchAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  //   console.log(response, "Response in fetchAllSpots");
  if (response.ok) {
    const allSpots = await response.json();
    dispatch(loadAllSpots(allSpots));
  }
};

// const initialState = {};

const spotReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS:
      return { ...state, ...action };
    default:
      return state;
  }
};

export default spotReducer;
