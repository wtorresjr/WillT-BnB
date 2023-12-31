import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="navUl">
      <div className="containNav">
        <li>
          <NavLink exact to="/">
            <img src="../../willt-bnb-logo.svg" id="logo" alt="website logo" />
          </NavLink>
        </li>
        <div className="profileActions">
          {sessionUser && (
            <NavLink to="/create-a-spot" id="createNewSpot">
              Create a New Spot
            </NavLink>
          )}
          {isLoaded && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </div>
      </div>
    </ul>
  );
}

export default Navigation;
