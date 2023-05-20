import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { createNewListing, editListing } from "../../store/listings";
import { useParams } from "react-router-dom";

const Form = ({ listing, type }) => {
  let dispatch = useDispatch();
  const history = useHistory();
  const { listingId } = useParams();
  const [title, setTitle] = useState(listing.title || "");
  const [address, setAddress] = useState(listing.address || "");
  const [city, setCity] = useState(listing.city || "");
  const [state, setState] = useState(listing.state || "");
  const [country, setCountry] = useState(listing.country || "");
  const [hours, setHours] = useState(listing.hours || "");
  const [description, setDescription] = useState(listing.description || "");
  const [image_url, setImageUrl] = useState(listing.image_url || "");
  const [submitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [loaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!listing || !loaded ) return;

    const errors = {};
    console.log("what is listing? ", listing)
    console.log("what the frick is title: ", title)
    if (title.length === 0) errors.title = "Title is required";
    if (address.length === 0) errors.address = "Address is required";
    if (city.length === 0) errors.city = "City is required";
    if (state.length === 0) errors.state = "State is required";
    if (country.length === 0) errors.country = "Country is required";
    if (hours.length === 0) errors.hours = "Hours is required";
    if (description.length === 0)
      errors.description = "Description is required";
    if (
      !image_url.endsWith(".png") &&
      !image_url.endsWith(".jpg") &&
      !image_url.endsWith(".jpeg")
    ) {
      errors.image_url = "Image URL must end in .png, .jpg, .jpeg";
    }

    setValidationErrors(errors);
  }, [title, address, city, state, country, hours, description, image_url]);

  useEffect(() => {
        if (listing) {
            setTitle(listing?.title || "");
            setAddress(listing?.address || "");
            setCity(listing?.city || "");
            setState(listing?.state || "");
            setCountry(listing?.country || "");
            setHours(listing?.hours || "");
            setDescription(listing?.description || "");
            setImageUrl(listing?.image_url || "");
            setIsLoaded(true);
          }
  }, [listing]);

  const handleSubmit = async (e) => {
    // console.log("handle click submit function running");
    e.preventDefault();
    setIsSubmitted(true);

    const errorArr = Object.values(validationErrors || {});
    // console.log("this is errors array in handle click: ", errorArr);

    if (errorArr.length > 0) {
      // console.log("if errors array.lenth === 0 running");
      return;
    } else {
      const listing = {
        title,
        address,
        city,
        state,
        country,
        hours,
        description,
        image_url,
      };
      if (type === "CreateListingForm") {
        const createdListing = await dispatch(createNewListing(listing));

        if (createdListing.id) {
          history.push(`/listings/${createdListing.id}`);
        }
      } else if (type === "UpdateListingForm") {
        const updatedListing = await dispatch(editListing(listingId, listing));
        history.push(`/spots/${updatedListing.id}`);
      }
    }
  };

  return (
    <>
      {type === "CreateListingForm" ? (
        <h1>Create a new Listing</h1>
      ) : (
        <h1>Update your Listing</h1>
      )}
      <form onSubmit={handleSubmit}>
        <ul>
          {Object.values(validationErrors).map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label>
          Hours
          <input
            type="text"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Image
          <input
            type="text"
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </label>
      </form>
    </>
  );
};

export default Form;
