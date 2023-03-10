import { csrfFetch } from "./csrf";

//ACTION TYPES
const GET = "reviews/getReviews";
const CREATE = "reviews/createReviews";
const DELETE = "reviews/deleteReviews";
const USER_REVIEWS = "reviews/getUserReviews";

//ACTIONS
const getSpotReviews = (reviews) => {
  return {
    type: GET,
    reviews,
  };
};

const createReviews = (review) => {
  return {
    type: CREATE,
    review,
  };
};

const deleteReviews = (deleteReview) => {
  return {
    type: DELETE,
    deleteReview,
  };
};

const getUserReviews = (userReviews) => {
  return {
    type: USER_REVIEWS,
    userReviews,
  };
};

//THUNKS

export const getSpotReviewsThunk = (reviews) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${reviews}/reviews`);

  if (response.ok) {
    const spotReviews = await response.json();
    dispatch(getSpotReviews(spotReviews));
    return spotReviews;
  }
};

export const createReviewsThunk = (review, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    body: JSON.stringify(review),
  });

  if (response.ok) {
    const createdReview = await response.json();
    dispatch(createReviews(createdReview, spotId));
    return createdReview;
  }
};
export const deleteReviewThunk = (deleteReview) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${deleteReview}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const deleted = await response.json();
    dispatch(deleteReviews(deleteReview));
    return deleted;
  }
};
export const getUserReviewsThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/current`, { method: "GET" });

  if (response.ok) {
    const userReview = await response.json();
    dispatch(getUserReviews(userReview));
    return response;
  }
};

//REDUCER
const initialState = {};
const reviewsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET:
      const allReviews = action.reviews.Reviews;

      newState["allReviews"] = [...allReviews];
      return newState;
    case CREATE:
      const createdReview = action.review;
      return createdReview;
    case DELETE:
      const deletedReview = action.deleteReview;
      newState.allReviews = state.allReviews.filter(
        (review) => review.id === deletedReview
      );
      return newState;
    case USER_REVIEWS:
      newState["userReviews"] = action.userReviews;
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
