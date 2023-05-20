import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();


  return (
    <div className="navigation-container">
      <NavLink exact to="/listings" id="home">
        foodiecore
      </NavLink>

      <div className="group-links">
        {isLoaded && (
          <div className="profile-button-container">
            <ProfileButton user={sessionUser} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
