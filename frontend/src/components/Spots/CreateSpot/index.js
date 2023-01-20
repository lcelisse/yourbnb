import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import * as spotActions from "../../../store/spots";
import "./CreateSpot.css";

export default function CreateSpotForm() {
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const sessionUser = useSelector((state) => state.session.user);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to={"/"} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    return dispatch(
      spotActions.createSpotsThunk({
        name,
        description,
        previewImage,
        price,
        address,
        city,
        state,
        country,
      })
    )
      .then(() => {
        closeModal();
      })

      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className="formContainer">
      <div className="title">
        <p className="red">Bnb you home !</p>
      </div>
      <div className="form">
        <form className="createSpot">
          <input
            className="input1"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
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
          <input
            className="input-img"
            type="text"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            placeholder="Preview Image"
            required
          ></input>
          <ul className="errors">
            {errors.map((error, id) => (
              <li key={id}>{error}</li>
            ))}
          </ul>
        </form>
        <button className="createBnb" type="submit" onClick={handleSubmit}>
          Bnb Your Spot
        </button>
      </div>
    </div>
  );
}
