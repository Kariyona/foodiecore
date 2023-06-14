import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import SearchList from "./SearchList";
import "./search.css"

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const listingsObj = useSelector((state) => state.listings.allListings)
  // console.log("listings: ", listings)
  const listings = Object.values(listingsObj); //listings array
  // console.log("listings array: ", listings)
  const [search, setSearch] = useState("");
  const history = useHistory();

  const ProfileClick = () => {
    history.push(`/profile/${sessionUser.id}`);
  };

  const CreateListingClick = () => {
    history.push(`/listings/new`);
  };

  const searched = listings.filter(listing => {
    if (search === "") return null
    else if (listing.title.toLowerCase().includes(search.toLowerCase())) {
      return listing
    }
  })

  const resetSearch = () => {
    setSearch("")
  }


  return (
    <>
      <div className="navigation-container">
        <NavLink className="navlink" exact to="/listings">
          <img className="logo-image" src="https://i.imgur.com/G8hTFdy.jpg" />
        </NavLink>

      <div className="search-bar-container">
        <input className="search-bar" type="text" placeholder="Search for a restaurant" value={search} onChange={(e) => setSearch(e.target.value)} />
        {/* <button className="search-button" type="submit">Search</button> */}
        {search.length > 0 && <SearchList listings={searched} resetSearch={resetSearch}/>}
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
