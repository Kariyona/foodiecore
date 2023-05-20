import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";

const ListingIndexItem = ({ listing }) => {
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
            <p>Open from {listing.hours}PM</p>
            <p className={`description ${expanded ? 'expanded' : ''}`}>
              {listing.description}
            </p>
            {expanded ? (
              <button ref={buttonRef} className="read-more-button" onClick={handleReadMoreClick}>
               {`<< Close`}
              </button>
            ) : (
              <button ref={buttonRef} className="read-more-button" onClick={handleReadMoreClick}>
                {`...Read more >>`}
              </button>
            )}
      </div>
    </div>
  );
};

export default ListingIndexItem;
