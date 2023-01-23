import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSpotDetailsThunk, getSpotsThunk } from "../../../store/spots";
import { getSpotReviewsThunk } from "../../../store/reviews";

import "./SpotDetails.css";
import SpotReviews from "../../Reviews/SpotReviews";
import none from "./img/no.jpg";
import CreateReviewForm from "../../Reviews/CreateReview";
import up from "./img/usr.png";
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import { useModal } from "../../../context/Modal";

import { deleteSpotsThunk } from "../../../store/spots";
import { createReviewsThunk } from "../../../store/reviews";
import EditForm from "../EditSpot";

export default function SpotDetails() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const { closeModal } = useModal();

  const spot = useSelector((state) => state.spot.spotDetails);

  useEffect(() => {
    dispatch(getSpotDetailsThunk(spotId)).then(() => setIsLoaded(true));
  }, [dispatch, spotId]);

  useEffect(() => {
    dispatch(getSpotReviewsThunk(spotId)).then(() => setIsLoaded(true));
  }, [dispatch, spotId, submitted]);

  useEffect(() => {
    dispatch(getSpotsThunk());
  }, [dispatch]);

  if (!spot) return null;
  if (!isLoaded) return null;

  let imgs = spot.SpotImages;

  let reviewClass;
  let deleteButton;
  let editButton;

  if (sessionUser) {
    spot.ownerId !== sessionUser.id
      ? (reviewClass = "seeReviewBttn")
      : (reviewClass = "noReviewBttn");
  }

  if (!sessionUser) {
    reviewClass = "noUser";
  }

  if (!sessionUser) {
    deleteButton = "noUser";
    editButton = "noEdit";
  }

  if (sessionUser) {
    spot.ownerId === sessionUser.id
      ? (deleteButton = "seeReviewBttn")
      : (deleteButton = "noReviewBttn");
  }

  if (sessionUser) {
    spot.ownerId === sessionUser.id
      ? (editButton = "seeEdit")
      : (editButton = "noEdit");
  }

  const createNewReview = async (e, review, stars) => {
    e.preventDefault();
    let errors = [];

    await dispatch(createReviewsThunk({ review, stars }, spotId)).catch(
      async (res) => {
        const data = await res.json();

        if (data && data.errors) {
          errors = data.errors;
        }
      }
    );

    await dispatch(getSpotDetailsThunk(spotId)).then(() =>
      dispatch(getSpotReviewsThunk(spotId))
    );

    setIsLoaded(true);
    if (!errors.length) {
      closeModal();
      return { success: true };
    } else {
      return { errors };
    }
  };

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
              <div className={editButton}>
                <OpenModalMenuItem
                  className="editBttn"
                  itemText={<i className="fas fa-edit"></i>}
                  modalComponent={<EditForm />}
                />
              </div>
              <button
                className={deleteButton}
                onClick={async () => {
                  await dispatch(deleteSpotsThunk(spot.id))
                    .then(() => dispatch(getSpotsThunk()))
                    .then(history.push("/"));
                }}
              >
                <i className="fa fa-trash"></i>
              </button>
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
                <img src={imgs[1].url} alt="preview" className="image2" />
              ) : (
                <img src={none} alt="preview" className="image2" />
              )}
            </div>
            <div className="img3">
              {imgs[2] ? (
                <img src={imgs[2].url} alt="preview" className="image3" />
              ) : (
                <img src={none} alt="preview" className="image3" />
              )}
            </div>
            <div className="img4">
              {imgs[3] ? (
                <img src={imgs[3].url} alt="preview" className="image4" />
              ) : (
                <img src={none} alt="preview" className="image4" />
              )}
            </div>
            <div className="img5">
              {imgs[4] ? (
                <img src={imgs[4].url} alt="preview" className="image5" />
              ) : (
                <img src={none} alt="preview" className="image5" />
              )}
            </div>
          </div>
          <div className="bookingInfo-container">
            <div className="moreInfo">
              <div className="hosted">
                <h1 className="hosting">
                  {spot.name} hosted by {spot.Owner.firstName}{" "}
                  <img src={up} className="userImg" alt="user" />
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
                <p>{spot.description}</p>
              </div>
            </div>
            <div className="booking-spot">
              <div className="booking-container">
                <div className="topPart">
                  <div>
                    <span className="a-night">${spot.price} night </span>
                  </div>
                  <div className="star-reviews">
                    <span className="star-reviews">
                      ★
                      {Number(spot.avgStarRating)
                        ? Number(spot.avgStarRating).toFixed(1)
                        : "No Reviews Yet"}{" "}
                      · {spot.numReviews} Reviews
                    </span>
                  </div>
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
                <OpenModalMenuItem
                  className="addReview"
                  itemText="Add a review"
                  modalComponent={
                    <CreateReviewForm
                      spotId={spotId}
                      createNewReview={createNewReview}
                    />
                  }
                />
              </div>
            </div>
          </div>

          <SpotReviews />
        </div>
      </div>
    </>
  );
}
