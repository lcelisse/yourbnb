import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getSpotReviewsThunk } from "../../../store/reviews";
import { deleteReviewThunk } from "../../../store/reviews";
import { getSpotDetailsThunk } from "../../../store/spots";
import usr from ".././../Spots/SpotDetails/img/usr.png";
import "./SpotReviews.css";

export default function SpotReviews() {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.review.allReviews);
  const spot = useSelector((state) => state.spot.spotDetails);

  if (!reviews || !reviews.length) return null;

  return (
    <div>
      <ul>
        {reviews.map((review) => {
          return (
            <div className="container" key={review.id}>
              <div className="pfp">
                <img src={usr} className="pf" alt="user" />
              </div>
              <h3 className="review-user">{review.User.firstName}</h3>
              <p>Stars : ★{review.stars}</p>
              <div className="desc">{review.review}</div>
              <div className="delete-Rev">
                <button
                  className={
                    sessionUser
                      ? review.userId === sessionUser.id
                        ? "ReviewBttn"
                        : "noReview"
                      : review.userId === sessionUser
                      ? "ReviewBttn"
                      : "noReview"
                  }
                  onClick={async () => {
                    await dispatch(deleteReviewThunk(review.id))
                      .then(() => dispatch(getSpotDetailsThunk(spot.id)))
                      .then(() => dispatch(getSpotReviewsThunk(spot.id)));
                  }}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
