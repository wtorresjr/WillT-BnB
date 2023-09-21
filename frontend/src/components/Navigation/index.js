import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="navUl">
      <li>
        <NavLink exact to="/">
          <img src="../../airbnb-logo-full.svg" id="logo" />
        </NavLink>
      </li>
      <div className="profileActions">
        {sessionUser && (
          <NavLink to="/spots" id="createNewSpot">
            Create a New Spot
          </NavLink>
        )}
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </div>
    </ul>
  );
}

export default Navigation;
