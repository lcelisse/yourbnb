import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    history.push("/");
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const userSpots = (e) => {
    e.preventDefault();
    history.push("/my-spots");
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div className="profileButton">
        <button className="profile" onClick={openMenu}>
          <i className="fas fa-user-circle" />
          <i className="fa-solid fa-bars" />
        </button>
      </div>

      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="profileInfo">
            <li>{user.username}</li>
            <li>
              {user.firstName} {user.lastName}
            </li>
            <li>{user.email}</li>
            <li>
              <button onClick={userSpots} className="userSpots-button">
                My Spots
              </button>
              <button onClick={logout} className="userLogout-button">
                Log Out
              </button>
            </li>
          </div>
        ) : (
          <div className="menu">
            <div className="logIn">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
            <div className="signUp">
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
