import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSpotReviewsThunk } from "../../../store/reviews";

import "./CreateReviewForm.css";

export default function CreateReviewForm({ spotId, createNewReview }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");

  const [errors, setErrors] = useState([]);

  const [stars, setStars] = useState("");

  useEffect(() => {
    dispatch(getSpotReviewsThunk(spotId));
  }, [dispatch, spotId]);

  return (
    <div className="createReview-container">
      <div className="heading">
        <p>Create a Review</p>
      </div>
      <div className="form">
        <form className="createReview-form">
          <textarea
            className="review-desc"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="How was your stay ?"
            required
          />
          <input
            className="starReview"
            type="number"
            min={0}
            max={5}
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            placeholder="Stars"
            required
          />
          <ul className="errors">
            {errors.map((error, id) => (
              <li key={id}>{error}</li>
            ))}
          </ul>

          <button
            className="reviewBttn"
            type="submit"
            onClick={async (e) => {
              e.preventDefault();
              const res = await createNewReview(e, review, stars);
              if (res && res.errors && res.errors.length) {
                setErrors(res.errors);
              }
            }}
          >
            Create a Review
          </button>
        </form>
      </div>
    </div>
  );
}
