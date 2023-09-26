import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/getAll";
const CREATE_SPOT = "spots/create";
const ADD_IMAGE = "spots/add-images";
const FIND_ONE_SPOT = "spots/find-one";
const FIND_USER_SPOTS = "spots/user-spots";
const DELETE_USER_SPOT = "spots/delete-a-spot";

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

const addImages = (imageUrl) => {
  return {
    type: ADD_IMAGE,
    imageUrl,
  };
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

const createNewSpot = (spotData) => {
  return {
    type: CREATE_SPOT,
    spotData,
  };
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

const findUserSpots = (usersSpots) => {
  return {
    type: FIND_USER_SPOTS,
    usersSpots,
  };
};

export const getUserSpots = () => async (dispatch) => {
  const response = await csrfFetch(`/api/current-user`, {
    method: "GET",
  });
  // console.log(response, "Get User Spots response");
  const foundSpots = await response.json();
  // console.log(foundSpots, "Found spots response");
  dispatch(findUserSpots(foundSpots));
  return foundSpots;
};

const deleteSpot = (id) => {
  return {
    type: DELETE_USER_SPOT,
    id,
  };
};

export const deleteUserSpot = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "DELETE",
  });
  const deletedSpot = await response.json();
  return deletedSpot;
};

const spotReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS:
      return { ...state, allspots: action.allspots }; // Update allspots
    case FIND_USER_SPOTS:
      return { ...state, usersSpots: action.usersSpots };
    case CREATE_SPOT:
      return { ...state, createdSpot: action.spotData };
    case FIND_ONE_SPOT:
      return { ...state, oneSpot: action.id };
    case DELETE_USER_SPOT:
      if (state.usersSpots) {
        const updatedUsersSpots = state.usersSpots.filter(
          (spot) => spot.id !== action.id
        );
        return { ...state, usersSpots: updatedUsersSpots };
      }
      return state;
    default:
      return state;
  }
};

export default spotReducer;
