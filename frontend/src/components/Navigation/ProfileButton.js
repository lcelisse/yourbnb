import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import "./Navigation.css";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="menu">
      <button className="profilebutton" onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <div className="profile-menu">
        <ul className={ulClassName} ref={ulRef}>
          <li>{user.username}</li>
          <li>
            {user.firstName} {user.lastName}
          </li>
          <li>{user.email}</li>
          <li>
            <button className="button" onClick={logout}>
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileButton;
