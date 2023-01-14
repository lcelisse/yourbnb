import { csrfFetch } from "./csrf";

//ACTION TYPES
const DELETE = "spots/deleteSpots";
const CREATE = "spots/createSpots";
const EDIT = "spots/editSpots";
const GET = "spots/getSpots";
const SPOT_DETAILS = "spots/getSpotDetails";
const USER_SPOTS = "spots/getUserSpots";

//ACTIONS
export const deleteSpots = (deleteSpot) => {
  return {
    type: DELETE,
    deleteSpot,
  };
};

export const createSpots = (newSpot) => {
  return {
    type: CREATE,
    newSpot,
  };
};

export const editSpots = (editSpot) => {
  return {
    type: EDIT,
    editSpot,
  };
};

export const getSpots = (spots) => {
  return {
    type: GET,
    spots,
  };
};

export const getSpotDetails = (spot) => {
  return {
    type: SPOT_DETAILS,
    spot,
  };
};

export const getUserSpots = (userSpots) => {
  return {
    type: USER_SPOTS,
    userSpots,
  };
};

//THUNKS

export const deleteSpotsThunk = (deleteSpot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteSpots(deleteSpot));
  }
};

export const createSpotsThunk = (newSpot) => async (dispatch) => {
  const {
    name,
    description,
    price,
    previewImage,
    address,
    city,
    state,
    country,
    lat,
    lng,
  } = newSpot;
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    body: JSON.stringify({
      name,
      description,
      price,
      previewImage,
      address,
      city,
      state,
      country,
      lat,
      lng,
    }),
  });

  if (Response.ok) {
    const createdSpot = await response.json();
    const image = await csrfFetch(`/api/spots/${createdSpot.id}/images`, {
      method: "POST",
      body: JSON.stringify({
        url: previewImage,
        preview: true,
      }),
    });
    if (image.ok) {
      createdSpot.previewImage = image.url;
      dispatch(createSpots(createdSpot));
      return createdSpot;
    }
  }
};

export const editSpotsThunk = (editSpot, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    body: JSON.stringify(editSpot),
  });

  if (response.ok) {
    const editedSpot = response.json();
    dispatch(editSpots(editedSpot));
    return editedSpot;
  }
};

export const getSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`);

  if (response.ok) {
    const allSpots = await response.json();
    dispatch(getSpots(allSpots));
    return response;
  }
};

export const getSpotDetailsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spotDetails = await response.json();
    dispatch(getSpotDetails(spotDetails));
    return response;
  }
};

export const getUserSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/current`);

  if (response.ok) {
    const spots = await response.json();
    dispatch(getUserSpots(spots));
    return response;
  }
};

//REDUCER
const initialState = {};

const spotReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case DELETE:
      const deletedSpot = action.deleteSpot;
      delete newState.userSpots[deletedSpot];
      return newState;
    case CREATE:
      const createSpot = action.newSpot;
      return createSpot;
    case EDIT:
      const editedSpot = action.editSpot;
      newState[editedSpot.id] = editedSpot;
      return newState;
    case GET:
      const allSpots = {};
      const getAllSpots = action.payload.Spots;
      getAllSpots.forEach((eachSpot) => (allSpots[eachSpot.id] = spot));
      newState["allSpots"] = { ...allSpots };
      return newState;
    case SPOT_DETAILS:
      newState["spotDetails"] = action.spot;
      return newState;
    case USER_SPOTS:
      newState["userSpots"] = action.userSpots;
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
