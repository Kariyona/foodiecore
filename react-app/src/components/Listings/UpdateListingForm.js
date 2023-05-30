import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { editListing, getListingById, updateListing } from "../../store/listings";

const UpdateListingForm = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings.listing);

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    dispatch(getListingById(listingId))
  }, [dispatch, listingId])

  useEffect(() => {
    setTitle(listing.title)
    setAddress(listing.address)
    setCity(listing.city)
    setState(listing.state)
    setCountry(listing.country)
    setHours(listing.hours)
    setDescription(listing.description)
    setImageUrl(listing.image_url)

    console.log("Listing in the Redux state:", listing)
  }, [listing])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedListing = await dispatch(
      editListing({
        id: listingId,
        title,
        address,
        city,
        state,
        country,
        hours,
        description,
        image_url: imageUrl
      }, listingId)
    )
    if (!updatedListing.errors) {
      history.push(`/listings/${listingId}`)
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Address:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <label>
        City:
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </label>
      <label>
        State:
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
      </label>
      <label>
        Country:
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
      </label>
      <label>
        Hours:
        <input type="text" value={hours} onChange={(e) => setHours(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        imageUrl:
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </label>
      <button type="submit">Update Listing</button>
    </form>
    </>
  );
};

export default UpdateListingForm;
