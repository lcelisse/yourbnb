import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { createReviewsThunk } from "../../../store/reviews";
import "./CreateReviewForm.css";

export default function CreateReviewForm({ setSubmitted, spotId }) {
  const dispatch = useDispatch();
  const closeModal = useModal();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);

  const submit = async (e) => {
    e.preventDefault();

    return dispatch(createReviewsThunk({ review, stars }, spotId))
      .then(() => {
        setSubmitted((oldReview) => !oldReview);
        closeModal();
      })

      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className="createReview-container">
      <div className="heading">
        <p>Create a Review</p>
      </div>
      <div className="form">
        <form className="createReview-form" onSubmit={submit}>
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

          <button className="reviewBttn" type="submit">
            Create a Review
          </button>
        </form>
      </div>
    </div>
  );
}
