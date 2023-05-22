import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";

// Main Template for displaying the listings that belong to a user for homepage and profile
const ListingIndexItem = ({ listing, hideToggleArea }) => {
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);
  const buttonRef = useRef(null)

  const handleListingDetailsClick = () => {
      history.push(`/listings/${listing.id}`)
  }

  const handleReadMoreClick = () => {
    setExpanded(!expanded)
  }

  const handleClickOutside = (e) => {
    if (buttonRef.current && !buttonRef.current.contains(e.target)) {
      setExpanded(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className="listing-container">
      <div className="listing-card">

            <img src={listing.image_url} id="ad-image" onClick={handleListingDetailsClick}/>

            <h2>{listing.title}</h2>
            {listing.city}, {listing.state}, {listing.country}
            <p className={`description ${expanded ? 'expanded' : ''}`}>
              {listing.description}
            </p>
            {!hideToggleArea && (
              <button ref={buttonRef} className="read-more-button" onClick={handleReadMoreClick}>
               {expanded ? `<< Close` : "...Read more >>"}
              </button>
            )}
      </div>
    </div>
  );
};

export default ListingIndexItem;
