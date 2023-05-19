import React from 'react';
import { useHistory } from "react-router-dom";

const ListingIndexItem = ({ listing }) => {
  const history = useHistory();

  // const handleListingDetailsClick = () => {
  //     history.push(`/listings/${listing.id}`)
  // }

  return (
    <>
      <div className="listing-card">
        <div className="listing-card-tile">
          <div className="listing-image">
            <img src={listing.image_url} id="ad-image" />
          </div>

            <div>
            <h2>{listing.title}</h2>
            <p>
              {listing.city}, {listing.state}, {listing.country}
            </p>
            <p>{listing.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingIndexItem;
