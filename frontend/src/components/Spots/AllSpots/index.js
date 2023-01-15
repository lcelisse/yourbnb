import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSpotsThunk } from "../../../store/spots";
import "./AllSpots.css";

export default function AllSpots() {
  const spots = useSelector((state) => state.spot.allSpots);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getSpotsThunk());
  }, [dispatch]);
  if (!spots) return null;
  const allOfSpots = Object.values(spots);

  const clickHandler = (spotId) => {
    history.push(`/spots/${spotId}`);
  };

  return (
    <div className="allSpots-container">
      <div>
        <ul className="spots-card">
          {allOfSpots.map((spot) => {
            return (
              <div
                className="if-clicked"
                key={spot.id}
                onClick={() => clickHandler(spot.id)}
              >
                <span className="previewImg">
                  <img
                    className="spot-img"
                    src={spot.previewImage.url}
                    alt={`${spot.name}`}
                  />
                </span>
                <span className="location">
                  {spot.city}, {spot.state}{" "}
                  <span>
                    {" "}
                    ★
                    {Number(spot.avgRating)
                      ? Number(spot.avgRating).toFixed(1)
                      : "No Reviews Yet"}
                  </span>
                </span>

                <div className="name">{spot.name}</div>
                <span className="price">{spot.price} per night</span>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
