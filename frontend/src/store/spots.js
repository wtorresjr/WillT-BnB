import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/getAll";

const loadAllSpots = (allspots) => {
  return {
    type: GET_ALL_SPOTS,
    allspots,
  };
};

export const fetchAllSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");
  if (response.ok) {
    const allSpots = await response.json();
    dispatch(loadAllSpots(allSpots));
  }
};

const initialState = { allSpots: [], isLoading: true };

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS:
      return { ...state, allSpots: [...action.allSpots] };
    default:
      return state;
  }
};

export default spotReducer;
