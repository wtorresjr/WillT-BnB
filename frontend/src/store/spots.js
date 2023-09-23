import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/getAll";
const CREATE_SPOT = "spots/create";
const ADD_IMAGE = "spots/add-images";
const FIND_ONE_SPOT = "spots/find-one";

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

const addImages = (imageUrl) => {
  return {
    type: ADD_IMAGE,
    imageUrl,
  };
};

const findOneSpot = (id) => {
  return {
    type: FIND_ONE_SPOT,
    id,
  };
};

export const findOne = (id) => async (dispatch) => {
  const response = await fetch(`/api/spots/${id}`);
  const foundSpot = await response.json();
  dispatch(findOneSpot(foundSpot));
  return foundSpot;
};

export const addImageToSpot = (id, imageUrl) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}/spot-images`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(imageUrl),
  });
  const newImage = await response.json();
  dispatch(addImages(newImage));
  return newImage;
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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const newSpot = await response.json();
  dispatch(createNewSpot(newSpot));
  return newSpot;
};

const spotReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS:
      return { ...state, ...action };
    case CREATE_SPOT:
      return { ...state, createdSpot: action.spotData };
    case FIND_ONE_SPOT:
      return { ...state, oneSpot: action.id };
    default:
      return state;
  }
};

export default spotReducer;
