import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserBookingsThunk, deleteBookingThunk } from "../../store/bookings";
import "./Bookings.css";
import { dateForm } from "../Spots/SpotDetails";
import none from "../Spots/SpotDetails/img/no.jpg";

import EditBookingsForm from "../EditBookings/EditBookings";
import SpotDetails from "../Spots/SpotDetails";

export default function Bookings() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const bookings = useSelector((state) => state.booking?.Bookings);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

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
    if (window.confirm("Are you sure you want to delete this booking?")) {
      dispatch(deleteBookingThunk(booking.id)).then(() => {
        setHasClicked(!hasClicked);
      });
    }
  };

  return (
    <div className="my-bookings">
      <h1 className="bookings-hEAD"> Your Bookings</h1>
      <div className="bookings-body">
        {!bookings.length && <div>You have no bookings.</div>}
        {bookings.map((booking) => {
          return (
            <div key={booking.id} className="booking">
              <strong>
                Booking: {dateForm(booking.startDate)} -{" "}
                {dateForm(booking.endDate)}
              </strong>

              <div className="previewImg">
                <img
                  className="spot-img"
                  src={
                    booking.Spot.previewImage ? booking.Spot.previewImage : none
                  }
                  alt={`${booking.Spot.name}`}
                />
              </div>
              <div className="edit-delete-buttons">
                <EditBookingsForm
                  booking={booking}
                  hasClicked={hasClicked}
                  setHasClicked={setHasClicked}
                />
                <button
                  className="button"
                  onClick={() => {
                    clickDelete(booking);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
