import { csrfFetch } from "./csrf";

//ACTION TYPES
const DELETE = "spots/deleteSpots";
const CREATE = "spots/createSpots";
const EDIT = "spots/editSpots";
const GET = "spots/getSpots";
const SPOT_DETAILS = "spots/getSpotDetails";
const USER_SPOTS = "spots/getUserSpots";

//ACTIONS
export const deleteSpots = (spot) => {
  return {
    type: DELETE,
    spot,
  };
};

export const createSpots = (newSpot) => {
  return {
    type: CREATE,
    newSpot,
  };
};

export const editSpots = (spot) => {
  return {
    type: EDIT,
    spot,
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

export const getUserSpots = (spots) => {
  return {
    type: USER_SPOTS,
    spots,
  };
};
