import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotDetailsThunk } from "../../../store/spots";
import { getSpotReviewsThunk } from "../../../store/reviews";
import "./SpotDetails.css";
import SpotReviews from "../../Reviews/SpotReviews";
import none from "./img/no.jpg";
import CreateReviewForm from "../../Reviews/CreateReview";
import up from "./img/usr.png";

export default function SpotDetails() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const [submitted, setSubmitted] = useState(false);
  const [getReviews, setGetReviews] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  const spot = useSelector((state) => state.spot.spotDetails);

  useEffect(() => {
    dispatch(getSpotDetailsThunk(spotId));
  }, [dispatch, spotId, submitted]);

  useEffect(() => {
    dispatch(getSpotReviewsThunk(spotId))
      .then((data) => setGetReviews(data))
      .then(() => setIsLoaded(true));
  }, [dispatch, spotId, submitted]);

  if (!spot) return null;
  if (!isLoaded) return null;

  let imgs = spot.SpotImages;

  let reviewClass;

  if (sessionUser) {
    spot.ownerId !== sessionUser.id
      ? (reviewClass = "seeReviewBttn")
      : (reviewClass = "noReviewBttn");
  }

  if (!sessionUser) {
    reviewClass = "noUser";
  }

  return (
    <>
      <div className="spotDetail-body">
        <div className="notReview">
          <div className="top-info">
            <div className="spotName">
              <h1>{spot.name}</h1>
            </div>
            <div className="spotInfo">
              ★
              {Number(spot.avgStarRating)
                ? Number(spot.avgStarRating).toFixed(1)
                : "No Reviews Yet"}{" "}
              · {spot.numReviews} Reviews · {spot.city} , {spot.state} ,
              {spot.country}
            </div>
          </div>
          <div className="img-container">
            <div className="img1">
              {imgs[0] ? (
                <img src={imgs[0].url} alt="preview" className="image1" />
              ) : (
                <img src={none} alt="preview" className="image1" />
              )}
            </div>
            <div className="img2">
              {imgs[1] ? (
                <img src={imgs[1].url} alt="preview" className="image1" />
              ) : (
                <img src={none} alt="preview" className="image1" />
              )}
            </div>
            <div className="img3">
              {imgs[2] ? (
                <img src={imgs[2].url} alt="preview" className="image1" />
              ) : (
                <img src={none} alt="preview" className="image1" />
              )}
            </div>
            <div className="img4">
              {imgs[3] ? (
                <img src={imgs[3].url} alt="preview" className="image1" />
              ) : (
                <img src={none} alt="preview" className="image1" />
              )}
            </div>
            <div className="img5">
              {imgs[4] ? (
                <img src={imgs[4].url} alt="preview" className="image1" />
              ) : (
                <img src={none} alt="preview" className="image1" />
              )}
            </div>
          </div>
          <div className="bookingInfo-container">
            <div className="moreInfo">
              <div className="hosted">
                <h1 className="hosting">
                  {spot.name} hosted by {spot.Owner.firstName}{" "}
                  <img src={up} className="userImg" />
                </h1>

                <span className="hostingInfo">
                  {Math.floor(Math.random() * (9 - 1) + 1)} guests ·{" "}
                  {Math.floor(Math.random() * (6 - 1) + 2)} bedrooms ·
                  {Math.floor(Math.random() * (6 - 1) + 3)} beds ·
                  {Math.floor(Math.random() * (5 - 1) + 1)} bathrooms
                </span>
              </div>
              <div className="highlights">
                <h2 className="hl-titles">Dedicated Workspace</h2>
                <h4 className="hl-info">
                  A common area with wifi that’s well-suited for working.
                </h4>
                <h2 className="hl-titles">Self check-in</h2>
                <h4 className="hl-info">Check yourself in with the lockbox.</h4>
                <h2 className="hl-titles">Great Location</h2>
                <h4 className="hl-info">
                  90% of recent guests gave the location a 5-star rating.
                </h4>
              </div>
              <div className="inDepthInfo">
                <h3>{spot.description}</h3>
              </div>
            </div>
            <div className="booking-container">
              <div className="topPart">
                <h2 className="a-night">
                  ${spot.price} night{" "}
                  <span className="star-reviews">
                    ★
                    {Number(spot.avgStarRating)
                      ? Number(spot.avgStarRating).toFixed(1)
                      : "No Reviews Yet"}{" "}
                    · {spot.numReviews} Reviews
                  </span>
                </h2>
              </div>
              <div className="button"></div>
              <button className="checkout"> Unavailable </button>

              <p className="no-charge">You won't be charged yet</p>
              <div className="fees">
                <div className="night-fees">
                  ${spot.price} x 5 nights <span>${spot.price * 5}</span>
                </div>
                <div className="night-fees">
                  Cleaning Fee <span>${(spot.price * 0.5).toFixed(0)}</span>
                </div>
                <div className="night-fees">
                  Service Fee <span>${(spot.price * 0.15).toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="reviews">
            <div className="review-info">
              <div className="review-stuff">
                ★
                {Number(spot.avgStarRating)
                  ? Number(spot.avgStarRating).toFixed(1)
                  : "No Reviews Yet"}
                · {spot.numReviews} Reviews
              </div>
              <div className={reviewClass}>
                <CreateReviewForm spot={spotId} submitted={setSubmitted} />
              </div>
            </div>

            <SpotReviews allReviews={getReviews.Reviews} />
          </div>
        </div>
      </div>
    </>
  );
}
