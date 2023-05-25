import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();


  const ProfileClick = () => {
    history.push(`/profile/${sessionUser.id}`)
  }

  const CreateListingClick = () => {
    history.push(`/listings/new`)
  }

  return (
    <div className="navigation-container">
      <NavLink exact to="/" id="home">
        <img className="big-logo" src="https://i.imgur.com/G8hTFdy.jpg"/>
      </NavLink>

      <div className="group-links">
        {sessionUser && <button className="nav-buttons" onClick={ProfileClick}>Profile</button>}
        {sessionUser && <button className="nav-buttons" onClick={CreateListingClick}>Create New Listing</button>}

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
