import { useState } from "react";
import { Modal } from "../../../context/Modal";
import CreateSpotForm from "./CreateSpotForm";
import "./CreateSpot.css";

export default function CreateSpot() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className="createButton" onClick={() => setShowModal(true)}>
        Bnb your home
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSpotForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}
