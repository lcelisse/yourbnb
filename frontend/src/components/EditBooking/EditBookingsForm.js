import React, { useState, useEffect } from "react";
import Calendar from "../Spots/SpotDetails/Calender";
import { dateForm } from "../Spots/SpotDetails";
import { useDispatch } from "react-redux";
import { editBookingThunk } from "../../store/bookings";
import "./EditBooking.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function EditBookingsForm({
  booking,
  hasClicked,
  setHasClicked,
  setShowModal,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [range, setRange] = useState([
    {
      startDate: new Date(booking.startDate),
      endDate: new Date(booking.endDate),
      key: "selection",
    },
  ]);

  const [disabled, setDisabled] = useState(true);

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    const oldDate = {
      startDate: new Date(booking.startDate),
      endDate: new Date(booking.endDate),
    };
    if (
      range[0].startDate.getTime() === oldDate.startDate.getTime() &&
      range[0].endDate.getTime() === oldDate.endDate.getTime()
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [range, booking]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    if (
      window.confirm(
        `Are you sure you want to change this booking from ${dateForm(
          booking.startDate
        )} - ${dateForm(booking.endDate)} to ${dateForm(
          range[0].startDate
        )} - ${dateForm(range[0].endDate)}?`
      )
    ) {
      dispatch(editBookingThunk(booking.id, range[0]))
        .then(() => {
          refreshPage();
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-bookings-form">
      <div>Change Booking</div>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx} className="errors">
            {error}
          </li>
        ))}
      </ul>
      <Calendar range={range} setRange={setRange} editBooking={true} />
      <button type="submit" className="bookings_button" disabled={disabled}>
        Change Booking
      </button>
    </form>
  );
}
