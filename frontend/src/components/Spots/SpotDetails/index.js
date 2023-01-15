import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpotDetailsThunk } from "../../../store/spots";
import { getSpotReviewsThunk } from "../../../store/reviews";

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
            · {spot.numReviews} reviews · {spot.city}, {spot.state},
            {spot.country}
          </span>
        </div>

        <div className="img-container">
          <img src={imgs[0].url} alt="preview"></img>
        </div>
        <div className="moreInfo">
          <div className="hosted"></div>
          <div className="highlights"></div>
          <div className="inDepthInfo"></div>
        </div>
        <div className="booking-container">
          <div className="topPart"></div>
          <div className="button"></div>
          <div className="no charge"></div>
          <div className="fees"></div>
        </div>

        <div className="reviews">
          <div className="review-info">
            ★
            {Number(spot.avgStarRating)
              ? Number(spot.avgStarRating).toFixed(1)
              : "No Reviews Yet"}{" "}
            · {spot.numReviews} Reviews
          </div>
          <div className="actual-reviews"></div>
        </div>
      </div>
    </>
  );
}
