import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteListingById, editListing, getListingsByUserId } from "../../store/listings";
import ListingIndexItem from "../Listings/ListingIndexItem";
import "./Profile.css";
import { useHistory } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const listings = useSelector((state) => state.listings.userListings);
  //   console.log("this is sesssion user hiiii:", user);
  //   console.log("profile page user:", user);
  console.log("this is userListing:", listings);

  useEffect(() => {
    if (user) {
      dispatch(getListingsByUserId(user.id));
    }
  }, [dispatch, user]);

  const handleUpdateButton = (listingId) => {
    history.push(`/listings/${listingId}/edit`);
  };

  const handleDeleteButton = (listingId) => {
    dispatch(deleteListingById(listingId))
  }

  return (
    <>
      <profile-listings-container>
        <h2>Manage your listings</h2>
        <div className="profile-card-container">
          {Object.values(listings).map((listing) => (
            <div key={listing.id} className="profile-listings-card">
              <div className="card">
                <img
                  src={listing.image_url}
                  className="profile-listing-image"
                />
                {listing.title}
                <p></p>
                {listing.city}, {listing.state}
                <p>Open from {listing.hours}PM</p>
              </div>
              <div>
                <button onClick={() => handleUpdateButton(listing.id)}>
                  Update
                </button>
                <button onClick={() => handleDeleteButton(listing.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </profile-listings-container>
    </>
  );
}

export default Profile;
