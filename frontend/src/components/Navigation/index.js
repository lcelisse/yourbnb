import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";

import OpenModalMenuItem from "./OpenModalMenuItem";

import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import logo from "./img/airbnb.png";
import bnb from "./img/bnb.png";
import CreateSpotForm from "../Spots/CreateSpot/index";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navBar">
      <div className="nav">
        <div className="topLeft">
          <NavLink exact to="/">
            <img className="logo-img" src={logo} alt="logo" />
            <img className="logo-img1" src={bnb} alt="logo" />
          </NavLink>
        </div>

        {isLoaded && (
          <div className="topRight">
            {sessionUser ? (
              <div className="bnbButton">
                <OpenModalMenuItem
                  itemText="bnb your home"
                  modalComponent={<CreateSpotForm />}
                />
              </div>
            ) : (
              <div>
                <div className="bnbButton">
                  <OpenModalMenuItem
                    className="bnbButton"
                    itemText="bnb your home"
                    modalComponent={<SignupFormModal />}
                  />
                </div>
              </div>
            )}
            <div className="profileButton">
              <ProfileButton user={sessionUser} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
