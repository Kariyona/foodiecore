import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllListings } from "../../store/listings";
import ListingIndexItem from "./ListingIndexItem";
import "./Listings.css";

function Listing() {
  const dispatch = useDispatch();
  const storeListings = useSelector((state) => state.listings);
  console.log("this is state", storeListings);

  useEffect(() => {
    dispatch(getAllListings());
  }, [dispatch]);

  const listings = storeListings.allListings;

  return (
    <div className="page-container">
      <div className="listings-container">
        <div className="first-card-text">
          <h1>Check out these delicious food spots!</h1>
          <i class="fa-solid fa-arrow-right"></i>
        </div>

        {Object.values(listings).map((listing) => (
          <ListingIndexItem key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}

export default Listing;
