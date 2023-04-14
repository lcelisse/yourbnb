import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deleteBooking,
  deleteBookingThunk,
  getUserBookingsThunk,
  userBookings,
} from "../../store/bookings";
import "./Bookings.css";
import { dateForm } from "../Spots/SpotDetails";
import none from "../Spots/SpotDetails/img/no.jpg";
import AllSpots from "../Spots/AllSpots";

export default function Bookings() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const bookings = useSelector((state) => state.booking.Bookings);

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  //change backend route to include user information
  useEffect(() => {
    if (user) {
      dispatch(getUserBookingsThunk(user.id)).then(() => {
        setIsLoaded(true);
      });
    }
  }, [dispatch, user, hasClicked]);

  if (!isLoaded) {
    return null;
  }

  if (!user) {
    history.push("/");
  }

  const clickDelete = (booking) => {
    const start = new Date(booking.startDate);
    const now = Date.now();

    if (start < now) {
      window.alert("Bookings that have been started can't be deleted");
    } else {
      if (window.confirm("Are you sure you want to delete this booking?")) {
        dispatch(deleteBookingThunk(booking.id)).then(() => {
          setHasClicked(!hasClicked);
        });
      }
    }
  };

  // const clickHandler = (spotId) => {
  //   history.push(`/spots/${spotId}`);
  // };

  return (
    <div className="my-bookings">
      <h1>Your Bookings</h1>
      <div className="bookings-body">
        {!bookings.length && <div>You have no bookings.</div>}
        {bookings.map((booking) => {
          console.log(booking);
          return (
            <div key={booking.id} className="booking">
              <strong>
                Booking: {dateForm(booking.startDate)} -{" "}
                {dateForm(booking.endDate)}
              </strong>

              <div style={({ alignContent: "center" }, { marginTop: "8px" })}>
                <div
                  className="div-for-booking"
                  // onClick={() => clickHandler(booking.id)}
                  key={booking.id}
                >
                  <img
                    className="bookingsImg"
                    src={
                      booking.Spot?.previewImage
                        ? booking.Spot?.previewImage
                        : none
                    }
                    alt="house"
                  />
                </div>
                <p className="loc">
                  {booking.Spot?.city}, {booking.Spot?.state}
                  <span className="stars">
                    ★
                    {Number(booking.Spot?.avgRating)
                      ? Number(booking.Spot?.avgRating).toFixed(1)
                      : "0"}
                  </span>
                </p>

                <p className="spot-name">{booking.Spot?.name}</p>
                <p className="price">
                  <span className="spot-price">${booking.Spot?.price}</span>{" "}
                  night
                </p>
              </div>
              <button
                className="delete-button-booking"
                onClick={() => {
                  clickDelete(booking);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
