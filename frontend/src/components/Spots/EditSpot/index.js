import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { editSpotsThunk } from "../../../store/spots";
import { getSpotDetailsThunk } from "../../../store/spots";
import "./EditSpot.css";
import { useModal } from "../../../context/Modal";

export default function EditForm() {
  const sessionUser = useSelector((state) => state.session.user);
  const spot = useSelector((state) => state.spot.spotDetails);
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const newSpot = { name, description, price, address, city, state, country };
    const { id } = spot;

    try {
      await dispatch(editSpotsThunk(newSpot, id));
      await dispatch(getSpotDetailsThunk(id));
      closeModal();
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    }
  };
  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div className="formContainer">
      <div className="title">
        <p className="red">Edit your bnb</p>
      </div>
      <div className="form">
        <form className="createSpot">
          <input
            className="input1"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Bnb Name"
            required
          ></input>
          <input
            className="input1"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
          ></input>
          <input
            className="input2"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            required
          ></input>
          <input
            className="input2"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
            required
          ></input>
          <input
            className="input2"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            required
          ></input>
          <input
            className="input2"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            required
          ></input>
          <textarea
            className="input-desc"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          ></textarea>
          <ul className="errors">
            {errors.map((error, id) => (
              <li key={id}>{error}</li>
            ))}
          </ul>
        </form>
        <button className="createBnb" type="submit" onClick={submit}>
          Edit Your Spot
        </button>
      </div>
    </div>
  );
}
