import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Form from "./Form";
import { useEffect, useState } from "react";
import { editListing, getListingById, updateListing } from "../../store/listings";

const UpdateListingForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings.listing);

  const [listingData, setListingData] = useState({
    title: "",
    address: "",
    city: "",
    state: "",
    country: "",
    hours: "",
    description: "",
    image_url: "",
  });

  useEffect(() => {
    dispatch(getListingById(listingId));
  }, [dispatch, listingId]);

  useEffect(() => {
    if (listing) {
      setListingData({
        ...listingData,
        title: listing.title || "",
        address: listing.address || "",
        city: listing.city || "",
        state: listing.state || "",
        country: listing.country || "",
        hours: listing.hours || "",
        description: listing.description || "",
        image_url: listing.image_url || "",
      });
    }
  }, [listing]);

  const handleUpdateButton = async () => {
    const updatedListing = await dispatch(editListing(listingData, listingId));
    console.log("Listing updated successfully:", updatedListing)
    history.push(`/listings/${updatedListing.id}`);
  };

  return (
    <>
      <Form listing={listingData} type="UpdateListingForm" />
      <button onClick={handleUpdateButton}>Update</button>
    </>
  );
};

export default UpdateListingForm;
