import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  const ProfileClick = () => {
    history.push(`/profile/${sessionUser.id}`);
  };

  const CreateListingClick = () => {
    history.push(`/listings/new`);
  };

  
  return (
    <>
      <div className="navigation-container">
        <NavLink className="navlink" exact to="/">
          <img className="logo-image" src="https://i.imgur.com/G8hTFdy.jpg" />
        </NavLink>

      <div className="search-bar-container">
        <input className="search-bar" type="text" placeholder="Search - does not work yet" />
        <button className="search-button" type="submit">Search</button>
      </div>

        <div className="group-links">
          {sessionUser && (
            <button className="nav-buttons" onClick={ProfileClick}>
              Manage Listings
            </button>
          )}
          {sessionUser && (
            <button className="nav-buttons" onClick={CreateListingClick}>
              Create New Listing
            </button>
          )}

          {isLoaded && (
            <div className="profile-button-container">
              <ProfileButton user={sessionUser} />
            </div>
          )}
        </div>
      </div>
      <div className="line"></div>
    </>
  );
}

export default Navigation;
