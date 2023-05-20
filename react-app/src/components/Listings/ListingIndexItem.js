import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

const ListingIndexItem = ({ listing }) => {
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);

  const handleListingDetailsClick = () => {
      history.push(`/listings/${listing.id}`)
  }

  const handleReadMoreClick = () => {
    setExpanded(!expanded)
  }

  return (
    <div className="listing-container">
      <div className="listing-card">

            <img src={listing.image_url} id="ad-image" onClick={handleListingDetailsClick}/>

            <h2>{listing.title}</h2>
            {listing.city}, {listing.state}, {listing.country}
            <p>Open from {listing.hours}PM</p>
            <p className={`description ${expanded ? 'expanded' : ''}`}>
              {listing.description}
            </p>
            {expanded ? (
              <button className="read-more-button" onClick={handleReadMoreClick}>
               ^ Close
              </button>
            ) : (
              <button className="read-more-button" onClick={handleReadMoreClick}>
                ...Read more
              </button>
            )}
      </div>
    </div>
  );
};

export default ListingIndexItem;
