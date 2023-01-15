import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSpotsThunk } from "../../../store/spots";

export default function AllSpots() {
  const dispatch = useDispatch();
  const history = useHistory;

  useEffect(() => {
    dispatch(getSpotsThunk());
  }, [dispatch]);

  const spots = useSelector((state) => state.spot);

  const allSpots = Object.values(spots);
  if (!allSpots) return null;
  console.log("hmm", allSpots);

  const clickHandler = (spotId) => {
    history.push(`/spots/${spotId}`);
  };

  return (
    <div className="allSpots-container">
      <div>
        <ul className="spots-card">
          {allSpots.map((spot) => {
            return (
              <div
                className="if-clicked"
                key={spot.id}
                onClick={() => clickHandler(spot.id)}
              >
                <span className="previewImg">
                  <img
                    className="spot-img"
                    src={spot.previewImage}
                    alt={`${spot.name}`}
                  />
                </span>
                <span>
                  {spot.city}, {spot.state}
                </span>
                <span className="review-star">
                  ★{" "}
                  {Number(spot.avgRating)
                    ? Number(spot.avgRating).toFixed(1)
                    : "No Reviews Yet"}{" "}
                </span>
                <span className="name">{spot.name}</span>
                <span className="price">{spot.price} per night</span>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
