import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/getAll";
const CREATE_SPOT = "spots/create";

const createNewSpot = (spotData) => {
  return {
    type: CREATE_SPOT,
    spotData,
  };
};

const loadAllSpots = (allspots) => {
  return {
    type: GET_ALL_SPOTS,
    allspots,
  };
};

export const fetchAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const allSpots = await response.json();
    dispatch(loadAllSpots(allSpots));
  }
};

export const createSpot = (payload) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    // headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const newSpot = await response.json();
    dispatch(createNewSpot(newSpot));
    return newSpot;
  }
};

const spotReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS:
      return { ...state, ...action };
    default:
      return state;
  }
};

export default spotReducer;
