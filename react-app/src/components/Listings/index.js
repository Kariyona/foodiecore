import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllListings } from '../../store/listings';
import ListingIndexItem from './ListingIndexItem';
import './Listings.css'

function Listing() {
    const dispatch = useDispatch();
    const storeListings = useSelector((state) => state.listings)
    console.log("this is state", storeListings)


    useEffect(() => {
        dispatch(getAllListings())
    }, [dispatch])


    const listings = storeListings.allListings
    console.log("store listings:", storeListings)
    console.log("!!!! listings !!!!", listings)


    return (
        <>
        <div className="listings-container">
            <h1>Listings</h1>
            {storeListings && Object.values(listings).map((listing) => (
            <ListingIndexItem key={listing.id} listing={listing}/>
        ))}
        </div>
        </>
    )
}

export default Listing;
{/* <div key={listing.id}>
            <img src={listing.image_url} id="ad-image"/>
            <h2>{listing.title}</h2>
            <p>{listing.city}, {listing.state}, {listing.country}</p>
            <p>{listing.description}</p>
          </div> */}
