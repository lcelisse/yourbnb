import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Redirect,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { deleteReviewThunk, getUserReviewsThunk } from "../../../store/reviews";
import "./UsersReview.css";

export default function UsersReviews() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [submit, setSubmit] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getUserReviewsThunk());
    setSubmit(false);
  }, [dispatch, setSubmit]);

  const userReviews = useSelector((state) => state.review.userReviews);
  if (!sessionUser) return <Redirect to="/" />;
  if (!userReviews) return null;

  return (
    <div className="userReview-container">
      <div className="review-container">
        <div className="user-title">
          <h1>Your Reviews</h1>
        </div>
        <div className="spots-usrRev">
          {userReviews.Reviews.map((review) => {
            const image = review.Spot;
            return (
              <div className="eachReview" key={review.id}>
                <div className="description">
                  <div className="img">
                    <img
                      className="actual-image"
                      src={image["SpotImages.url"]}
                      alt={review.id}
                    />
                  </div>
                  <div className="desc">
                    <div className="name">
                      <h3>{image.name}</h3>
                    </div>
                    <div className="your-stars">
                      Your Star Rating: ★ {Number(review.stars).toFixed(1)}
                    </div>
                    <div className="your-review">
                      Your Review: {review.review}
                    </div>
                  </div>{" "}
                  <div className="userReviewBttn">
                    <button
                      className="deleteReview"
                      onClick={async () => {
                        dispatch(getUserReviewsThunk())
                          .then(dispatch(deleteReviewThunk(review.id)))
                          .then(setSubmit(!submit));
                      }}
                    >
                      Delete Review
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
