import React, { useState, useEffect } from "react";
import Calender from "../Spots/SpotDetails/Calender";
import { dateForm } from "../Spots/SpotDetails";
import { useDispatch } from "react-redux";
import { editBookingThunk } from "../../store/bookings";
import "./EditBookings.css";

export default function EditBookingsForm({
  booking,
  hasClicked,
  setHasClicked,
  setShowModal,
}) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [range, setRange] = useState([
    {
      startDate: new Date(booking.startDate),
      endDate: new Date(booking.endDate),
      key: "selection",
    },
  ]);

  const [disabled, setDisabled] = useState(true);

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
          setHasClicked(!hasClicked);
          setShowModal(false);
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
        {errors?.map((error, idx) => (
          <li key={idx} className="error">
            {error}
          </li>
        ))}
      </ul>
      <Calender range={range} setRange={setRange} editBooking={true} />
      <button type="submit" className="bookings_button" disabled={disabled}>
        Change Booking
      </button>
    </form>
  );
}
