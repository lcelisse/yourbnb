import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { deleteSpotsThunk } from "../../../store/spots";
import { getUserSpotsThunk } from "../../../store/spots";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import EditForm from "../EditSpot";
import "./UsersSpots.css";
import none from "../SpotDetails/img/no.jpg";

export default function UsersSpots() {
  const dispatch = useDispatch();

  const [submitted, setSubmitted] = useState(false);

  const sessionUser = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spot.userSpots);
  //   const spotsArr = spots.Spots;

  useEffect(() => {
    dispatch(getUserSpotsThunk());
    setSubmitted(false);
  }, [dispatch, setSubmitted]);

  if (!sessionUser) return <Redirect to="/" />;
  if (!spots) return null;

  return (
    <div className="userSpots-container">
      <div className="spots-container">
        <div className="userSpots-title">
          <h2>Your Spots</h2>
        </div>
        <div className="eachSpot">
          {spots["Spots"].map((spot) => {
            return (
              <div className="eachSpot-container" key={spot.id}>
                <div className="spot-info">
                  <div className="img">
                    <img
                      src={spot.previewImage ? spot.previewImage : none}
                      alt={`${spot.name}`}
                      className="pic"
                    />
                  </div>
                  <div className="spot-desc">
                    <div className="spot-firstPart">
                      <h3>{spot.name}</h3>
                    </div>
                    <div>
                      ★
                      {Number(spot.avgStarRating)
                        ? Number(spot.avgStarRating).toFixed(1)
                        : "No Reviews Yet"}
                      · {spot.city} , {spot.state} ,{spot.country}
                    </div>
                    <div className="inDepth-desc">{spot.description}</div>
                    <div>
                      <h2 className="spot-price">${spot.price}</h2> /night
                    </div>
                  </div>
                </div>
                <div className="userSpots-buttons">
                  <OpenModalMenuItem
                    className="editBttn"
                    itemText="Edit Your Spot"
                    onItemClick={EditForm}
                    modalComponent={<EditForm />}
                  />
                </div>
                <div>
                  <button
                    className="deleteSpot"
                    onClick={async () => {
                      dispatch(getUserSpotsThunk())
                        .then(dispatch(deleteSpotsThunk(spot.id)))
                        .then(setSubmitted(!submitted));
                    }}
                  >
                    Delete This Spot
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
