// import ListingIndexItem from './ListingIndexItem'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListingsByUserId } from "../../store/listings";
import { useParams } from "react-router-dom";
import ListingIndexItem from "./ListingIndexItem";
import "./Listings.css"
import { getReviewsByUserId } from "../../store/reviews";

function UserListings() {
  const dispatch = useDispatch();
  const userListings = useSelector((state) => state.listings.userListings);
  const userReviews = useSelector((state) => state.reviews.userReviews);

  console.log("this is user reviews:", userReviews)
  const { id } = useParams();
  // console.log("this is the userid:", id)
  // console.log("this is user Listings: ", userListings)

  useEffect(() => {
    dispatch(getListingsByUserId(id));
    dispatch(getReviewsByUserId(id))
  }, [dispatch, id]);


  return (
    <>
      <h1>Take a peep at your listings...</h1>
      <div className="listing-card-row">
        {Object.values(userListings).map((listing) => (
          <ListingIndexItem key={listing.id} listing={listing} />
        ))}
      </div>

      <h1>Take a peep at your reviews...</h1>
      <div className="review-card-row">
      {Object.values(userReviews).map((review) => (
        <div key={review.id}>
        <p>---- Insert Title of Restaurant ----</p>
        <p>{review.comment}</p>
        </div>
        ))}
      </div>
    </>
  );
}

export default UserListings;
