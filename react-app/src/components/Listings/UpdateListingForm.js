import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { editListing, getListingById } from "../../store/listings";
import "./Form.css"

const UpdateListingForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings.listing);

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [hours, setHours] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    dispatch(getListingById(listingId));
  }, [dispatch, listingId]);

  useEffect(() => {
    setTitle(listing.title);
    setAddress(listing.address);
    setCity(listing.city);
    setState(listing.state);
    setCountry(listing.country);
    setHours(listing.hours);
    setDescription(listing.description);
    setImageUrl(listing.image_url);

    console.log("Listing in state:", listing);
  }, [listing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (title.length < 3) errors.title = "Title must be 3 or more characters";
    if (address.length === 0) errors.address = "Please enter a valid address";
    if (city.length === 0) errors.city = "Please enter a valid city";
    if (state.length === 0) errors.state = "Please enter a valid state";
    if (country.length === 0) errors.country = "Please enter a valid country";
    if (hours.length < 3)
      errors.hours = "Please enter a valid time in this format: 9-5";
    if (description.length < 30)
      errors.description =
        "Please enter a description with more than 30 characters";

    if (imageUrl.length === 0) errors.imageUrl = "Image is required";

    if (
      !imageUrl.endsWith(".png") &&
      !imageUrl.endsWith(".jpg") &&
      !imageUrl.endsWith(".jpeg")
    ) {
      errors.imageUrl = "Image URL must end in .png, .jpg, .jpeg";
    }
    setValidationErrors(errors);

    const errorArr = Object.values(validationErrors);

    if (errorArr.length > 0) {
      return;
    } else {
      const updatedListing = await dispatch(
        editListing(
          {
            id: listingId,
            title,
            address,
            city,
            state,
            country,
            hours,
            description,
            image_url: imageUrl,
          },
          listingId
        )
      );
      if (!updatedListing.errors) {
        history.push(`/listings/${listingId}`);
      }
    }
  };
  return (
    <>
      <form className="update-listing-form" onSubmit={handleSubmit}>
        <div className="form-group-container">
        <h3>Basics about your restaurant</h3>
        <label htmlFor="title">
          Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {validationErrors.title && (
            <span className="errors">{validationErrors.title}</span>
          )}
        </div>
        <div className="form-group-container">
        <label htmlFor="address">
          Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {validationErrors.address && (
            <span className="errors">{validationErrors.address}</span>
          )}
        </div>
        <div className="form-group-container">
        <label htmlFor="city">
          City
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {validationErrors.city && (
            <span className="errors">{validationErrors.city}</span>
          )}
        </div>
        <div className="form-group-container">
        <label htmlFor="state">
          State
          </label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          {validationErrors.state && (
            <span className="errors">{validationErrors.state}</span>
          )}
        </div>
        <div className="form-group-container">
        <label htmlFor="country">
          Country
          </label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          {validationErrors.country && (
            <span className="errors">{validationErrors.country}</span>
          )}
        </div>
        <div className="form-group-container">
        <label htmlFor="hours">
          Hours
          </label>
          <input
            type="text"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
          {validationErrors.hours && (
            <span className="errors">{validationErrors.hours}</span>
          )}
        </div>
        <div className="form-group-container">
        <label htmlFor="description">
          </label>
          <h3>Describe your restaurant</h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {validationErrors.description && (
            <span className="errors">{validationErrors.description}</span>
          )}
        </div>
        <div className="form-group-container">
        <label htmlFor="imageUrl">
          </label>
          <h3>Live up your post with a picture</h3>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          {validationErrors.imageUrl && (
            <span className="errors">{validationErrors.imageUrl}</span>
          )}
        </div>
        <button className="update-listing-button" type="submit">Update Listing</button>
      </form>
    </>
  );
};

export default UpdateListingForm;
