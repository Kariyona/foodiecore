import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { editListing, getListingById } from "../../store/listings";
import "./Form.css";

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
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false); //aws
  const [imagePreview, setImagePreview] = useState(""); //preview img
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    setImagePreview(listing.image_url)
  }, [listing]);

  const validateEditForm = () => {
    const errors = {};
    if (title.length < 3) errors.title = "Title must be 3 or more characters";
    if (address.length === 0) errors.address = "Please enter a valid address";
    if (city.length === 0) errors.city = "Please enter a valid city";
    if (state.length === 0) errors.state = "Please enter a valid state";
    if (country.length === 0) errors.country = "Please enter a valid country";
    if (hours.length < 3 || hours.length > 5)
      errors.hours = "Please enter a valid time in this format: 9-5";
    if (description.length < 30)
      errors.description =
        "Please enter a description with more than 30 characters";

    if (imageUrl.length === 0) errors.imageUrl = "Image is required";

    setValidationErrors(errors);
    return Object.values(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const formData = new FormData();
    setImageLoading(false);

    const isFormDataValid = validateEditForm();

    if (!isFormDataValid) {
      return;
    }
    formData.append("id", listingId);
    formData.append("title", title);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("country", country);
    formData.append("hours", hours);
    formData.append("description", description);
    formData.append("image_url", imageUrl);

    const updatedListing = await dispatch(editListing(formData, listingId));

    if (!updatedListing.errors) {
      history.push(`/listings/${listingId}`);
    }
  };

  return (
    <>
      <form className="update-listing-form" onSubmit={handleSubmit}>
        <div className="form-group-container">
          <h3>Basics about your restaurant</h3>
          <label htmlFor="title">Title</label>
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
          <label htmlFor="address">Address</label>
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
          <label htmlFor="city">City</label>
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
          <label htmlFor="state">State</label>
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
          <label htmlFor="country">Country</label>
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
          <label htmlFor="hours">Hours</label>
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
          <label htmlFor="description"></label>
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
          {/* <h3>Liven up your listing with photos</h3>
          <p className="bio-margin">
            Submit a link to at least one photo to publish your listing. This
            helps attract viewers to your listing.
          </p> */}
          <div className="form-group-container">
            <label htmlFor="imageUrl"></label>
            <h3>Live up your post with a picture</h3>
            {imagePreview && <img src={imagePreview} id="preview-image"/>}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImageUrl(e.target.files[0]);
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
            {/* {validationErrors.imageUrl && (
            <span className="errors">{validationErrors.imageUrl}</span>
          )} */}
          </div>
          {isSubmitted && (
            <span className="errors">{validationErrors.imageUrl}</span>
          )}
        </div>

        {imageLoading && null}
        <button className="update-listing-button" type="submit">
          Update Listing
        </button>
      </form>
    </>
  );
};

export default UpdateListingForm;
