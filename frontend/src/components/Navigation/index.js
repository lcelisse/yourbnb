import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";

import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

import CreateSpotForm from "../Spots/CreateSpot/index";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navBar">
      <div className="nav">
        <div className="topLeft">
          <NavLink exact to="/">
            Home
          </NavLink>
        </div>

        {isLoaded && (
          <div className="topRight">
            {sessionUser ? (
              <div>
                <div className="bnbButton">
                  <OpenModalMenuItem
                    itemText="bnb your home"
                    modalComponent={<CreateSpotForm />}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div>
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
