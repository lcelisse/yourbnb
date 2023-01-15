import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotDetailsThunk } from "../../../store/spots";
import { getSpotReviewsThunk } from "../../../store/reviews";
import "./SpotDetails.css";
import SpotReviews from "../../Reviews/SpotReviews";

export default function SpotDetails() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const spot = useSelector((state) => state.spot.spotDetails);

  useEffect(() => {
    dispatch(getSpotDetailsThunk(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    dispatch(getSpotReviewsThunk(spotId));
  }, [dispatch, spotId]);
  if (!spot) return null;

  let imgs = spot.SpotImages;

  return (
    <>
      <div className="spotDetail-body">
        <div className="top-info">
          <h1 className="spotName">{spot.name}</h1>
          <span className="spotInfo">
            ★
            {Number(spot.avgStarRating)
              ? Number(spot.avgStarRating).toFixed(1)
              : "No Reviews Yet"}{" "}
            · {spot.numReviews} reviews · {spot.city} , {spot.state} ,
            {spot.country}
          </span>
        </div>

        <div className="img-container">
          <img src={imgs[0].url} alt="preview"></img>
        </div>
        <div className="moreInfo">
          <div className="hosted">
            <h1 className="hosting">
              {spot.name} hosted by {spot.Owner.firstName}
            </h1>
            <h3 className="hostingInfo">
              {Math.floor(Math.random() * (9 - 1) + 1)} guests ·{" "}
              {Math.floor(Math.random() * (6 - 1) + 2)} bedrooms ·{" "}
              {Math.floor(Math.random() * (5 - 1) + 1)} bathrooms
            </h3>
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
          <div className="button">
            <button className="checkout"> Unavailable </button>
          </div>
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

        <div className="reviews">
          <div className="review-info">
            ★
            {Number(spot.avgStarRating)
              ? Number(spot.avgStarRating).toFixed(1)
              : "No Reviews Yet"}{" "}
            · {spot.numReviews} Reviews
          </div>
          <div className="actual-reviews">
            <SpotReviews />
          </div>
        </div>
      </div>
    </>
  );
}
