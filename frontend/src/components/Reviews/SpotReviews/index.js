import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUserReviewsThunk } from "../../../store/reviews";
import { deleteReviewThunk } from "../../../store/reviews";
import usr from ".././../Spots/SpotDetails/img/usr.png";
import "./SpotReviews.css";

export default function SpotReviews({ allReviews }) {
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const reviews = Object.values(allReviews);

  // const review = useSelector((state) => state.reviews.userReviews)

  useEffect(() => {
    dispatch(getUserReviewsThunk());
    setSubmitted(false);
  }, [dispatch, setSubmitted]);

  if (!allReviews) return null;
  return (
    <div>
      <ul>
        {reviews.map((review) => {
          return (
            <div className="container" key={review.id}>
              <div className="pfp">
                <img src={usr} className="pf" />
              </div>
              <h3 className="review-user">{review.User.firstName}</h3>
              <p>Stars : ★{review.stars}</p>
              <div className="desc">{review.review}</div>
              {review.userId === sessionUser.id && (
                <div>
                  <button
                    className="delete-Rev"
                    onClick={async () => {
                      dispatch(getUserReviewsThunk())
                        .then(dispatch(deleteReviewThunk(review.id)))
                        .then(setSubmitted(!submitted));
                    }}
                  >
                    <i classname="fa fa-trash"></i>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
}
