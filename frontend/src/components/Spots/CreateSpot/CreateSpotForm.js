import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createSpotsThunk } from "../../../store/spots";
import "./CreateSpot.css";

export default function CreateSpotForm({ setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(1.0);
  const [lng, setLng] = useState(2.0);
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState([]);

  if (!sessionUser) return <Redirect to={"/"} />;

  const handleSubmit = (e) => {
    e.preventDefault();

    return dispatch(
      createSpotsThunk({
        name,
        description,
        previewImage,
        price,
        lat,
        lng,
        address,
        city,
        state,
        country,
      })
    )
      .then((response) => {
        setName("");
        setAddress("");
        setCity("");
        setCountry("");
        setDescription("");
        setState("");
        setPrice("");
        setPreviewImage("");
        history.push(`/spots/${response.id}`)
      })
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className="formContainer">
      <div className="title">
        <span>Bnb it!</span>
        <span>You could earn money .</span>
      </div>
      <div className="form">
        <form className="createSpot" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
          ></input>
          <input
            className="input"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
          ></input>
          <input
            className="input"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            required
          ></input>
          <input
            className="input"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
            required
          ></input>
          <input
            className="input"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            required
          ></input>
          <input
            className="input"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            required
          ></input>
          <textarea
            className="input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          ></textarea>
          <input
            className="input"
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
        <button className="createBnb" type="submit">
          Bnb Your Spot
        </button>
      </div>
    </div>
  );
}