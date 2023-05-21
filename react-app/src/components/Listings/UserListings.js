// import ListingIndexItem from './ListingIndexItem'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListingsByUserId } from '../../store/listings';
import { useParams } from 'react-router-dom';
import ListingIndexItem from './ListingIndexItem';

function UserListings() {
    const dispatch = useDispatch();
    const userListings = useSelector((state) => state.listings.userListings);

    const { id } = useParams();
    // console.log("this is the userid:", id)
    // console.log("this is user Listings: ", userListings)

    useEffect(() => {
        dispatch(getListingsByUserId(id))
    }, [dispatch, id])

    return (
        <>
        <h1>Take a peep at your listings...</h1>
        {Object.values(userListings).map((listing) => (
            <ListingIndexItem listing={listing}/>
        ))}
        </>
    )
}

export default UserListings;
