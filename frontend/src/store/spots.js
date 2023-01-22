import { csrfFetch } from "./csrf";

//ACTION TYPES
const DELETE = "spots/deleteSpots";
const CREATE = "spots/createSpots";
const EDIT = "spots/editSpots";
const GET = "spots/getSpots";
const SPOT_DETAILS = "spots/getSpotDetails";
const USER_SPOTS = "spots/getUserSpots";

//ACTIONS
const deleteSpots = (deleteSpot) => {
  return {
    type: DELETE,
    deleteSpot,
  };
};

const createSpots = (newSpot) => {
  return {
    type: CREATE,
    newSpot,
  };
};

const editSpots = (editSpot) => {
  return {
    type: EDIT,
    editSpot,
  };
};

const getSpots = (spots) => {
  return {
    type: GET,
    spots,
  };
};

const getSpotDetails = (spot) => {
  return {
    type: SPOT_DETAILS,
    spot,
  };
};

const getUserSpots = (userSpots) => {
  return {
    type: USER_SPOTS,
    userSpots,
  };
};

//THUNKS

export const deleteSpotsThunk = (deleteSpot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${deleteSpot}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteSpots(deleteSpot));
  }
};

export const createSpotsThunk = (newSpot, previewImage) => async (dispatch) => {
  // console.log(previewImage.url)
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    body: JSON.stringify(newSpot),
  });

  if (response.ok) {
    const createdSpot = await response.json();
    const imageResponse = await csrfFetch(
      `/api/spots/${createdSpot.id}/images`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: previewImage.url,
          preview: true,
        }),
      }
    );

    if (imageResponse.ok) {
      const image = await imageResponse.json();
      console.log(image);
      createdSpot.previewImage = image.url;
      
      dispatch(createSpots(createdSpot));

      return createdSpot;
    }
  }
};

export const editSpotsThunk = (editSpot, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editSpot),
  });

  if (response.ok) {
    const editedSpot = response.json();
    const spot = { ...editedSpot, ...spotId };
    dispatch(editSpots(spot));
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
  const response = await csrfFetch(`/api/spots/current`, { method: "GET" });

  if (response.ok) {
    const spots = await response.json();
    dispatch(getUserSpots(spots));
    return spots;
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
      console.log({createSpot})
      return createSpot;

    case EDIT:
      const editedSpot = action.editSpot;
      newState[editedSpot.id] = editedSpot;
      return newState;
    case GET:
      const allSpots = {};
      const getAllSpots = action.spots.Spots;
      getAllSpots.forEach((eachSpot) => (allSpots[eachSpot.id] = eachSpot));

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
