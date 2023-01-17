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
      {allOfSpots.map((spot) => {
        return (
          <div
            className="spot"
            key={spot.id}
            onClick={() => clickHandler(spot.id)}
          >
            <div className="previewImg">
              <img
                className="spot-img"
                src={spot.previewImage.url}
                alt={`${spot.name}`}
              />
            </div>
            <div className="location">
              <h3>
                {spot.city}, {spot.state}
                <span>
                  ★
                  {Number(spot.avgRating)
                    ? Number(spot.avgRating).toFixed(1)
                    : "No Reviews Yet"}
                </span>
              </h3>
            </div>
            <div className="name">
              <span>{spot.name}</span>
              <span className="price">{spot.price} per night</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
