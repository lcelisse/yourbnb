import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import * as spotActions from "../../../store/spots";
import "./EditSpot.css";
import { useModal } from "../../../context/Modal";

export default function EditForm() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { spotId } = useParams();
  console.log(spotId)
  const history = useHistory();
  const { closeModal } = useModal;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(spotActions.getSpotDetailsThunk(spotId)).then((res) => {
      setName(res.name);
      setAddress(res.address);
      setCity(res.city);
      setCountry(res.country);
      setDescription(res.description);
      setState(res.state);
      setPrice(res.price);
      setPreviewImage(res.previewImage);
    });
  }, [dispatch, spotId]);

  const submit = (e) => {
    e.preventDefault();

    return dispatch(
      spotActions.editSpotsThunk({
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
      .then((response) => {
        setName("");
        setAddress("");
        setCity("");
        setCountry("");
        setDescription("");
        setState("");
        setPrice("");
        setPreviewImage("");

        closeModal();
        history.push(`/spots/${response.id}`);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
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
