import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Form from "./Form";
import { useEffect } from 'react';
import { getListingById } from "../../store/listings";

const UpdateListingForm = () => {
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings.listing);
  // console.log("type of:", typeof listingId)
  // const listingsArray = Object.values(listings);

  // let listing;
  // for (let i = 0; i < listingsArray.length; i++) {
  //   if (listingsArray[i].id === parseInt(listingId)) {
  //     listing = listingsArray[i]
  //   }
  // }
  // console.log("listing id:", listingId )
  useEffect(() => {
    dispatch(getListingById(listingId))
  }, [dispatch])
  // console.log("whaaaat is listing? ", listing)
  if (!listing) return <></>
  
  return (
    <Form listing={listing} type="UpdateListingForm" />
  )
};

export default UpdateListingForm;
