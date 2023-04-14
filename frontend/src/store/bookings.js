import { csrfFetch } from "./csrf";

const GET_SPOT_BOOKINGS = "bookings/GET_SPOT_BOOKINGS";
const GET_USER_BOOKINGS = "bookings/GET_USER_BOOKINGS";

export const getSpotBookings = (payload) => {
  return {
    type: GET_SPOT_BOOKINGS,
    payload,
  };
};

export const getUserBookings = (payload) => {
  return {
    type: GET_USER_BOOKINGS,
    payload,
  };
};

export const getSpotBookingsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
  const data = await response.json();
  dispatch(getSpotBookings(data));
  return data;
};

export const getUserBookingsThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/current`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getUserBookings(data));
    return data;
  }
};

export const createBookingThunk = (booking, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    body: JSON.stringify(booking),
  });
  const data = await response.json();
  return data;
};

export const editBookingThunk = (bookingId, booking) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "PUT",
    body: JSON.stringify(booking),
  });
  const data = await response.json();

  return data;
};

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });
  const data = await response.json();

  return data;
};

export default function bookingReducer(state = {}, action) {
  switch (action.type) {
    case GET_SPOT_BOOKINGS:
      return { ...state, ...action.payload };
    case GET_USER_BOOKINGS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
