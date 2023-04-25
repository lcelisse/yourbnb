import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditBookingsForm from "./EditBookingsForm";
import "./EditBooking.css";

export default function EditBookings({ booking, hasClicked, setHasClicked }) {
  const [showEdit, setShowEdit] = useState("hideEdit");

  return (
    <>
      <button
        onClick={() => {
          showEdit === "hideEdit"
            ? setShowEdit("showEdit")
            : setShowEdit("hideEdit");
        }}
      >
        Edit
      </button>
      <div className={showEdit}>
        <EditBookingsForm booking={booking} />
      </div>
    </>
  );
}
