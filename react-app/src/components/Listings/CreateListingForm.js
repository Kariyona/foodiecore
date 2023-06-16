// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { createNewListing } from '../../store/listings';

// const CreateListingForm = () => {
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const [title, setTitle] = useState('');
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [country, setCountry] = useState('');
//   const [hours, setHours] = useState('');
//   const [description, setDescription] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [validationErrors, setValidationErrors] = useState({
//     title: null,
//     address: null,
//     city: null,
//     state: null,
//     country: null,
//     hours: null,
//     description: null,
//     imageUrl: null
//   })

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const errors = {};
//     if (title.length < 3) errors.title = "Title must be 3 or more characters";
//     if (address.length === 0) errors.address = "Please enter a valid address";
//     if (city.length === 0) errors.city = "Please enter a valid city";
//     if (state.length === 0) errors.state = "Please enter a valid state";
//     if (country.length === 0) errors.country = "Please enter a valid country";
//     if (hours.length < 3) errors.hours = "Please enter a valid time in this format: 9-5";
//     if (description.length === 0) errors.description = "Please enter a valid description";
//     setValidationErrors(errors);

//     if (Object.keys(errors).length === 0) {
//       const listing = await dispatch(
//         createNewListing({
//           title,
//           address,
//           city,
//           state,
//           country,
//           hours,
//           description,
//           image_url: imageUrl,
//         })
//       );
//       if (!listing.errors) {
//         setIsSubmitted(true);
//         history.push(`/listings/${listing.id}`);
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Title:
//         <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
//         {validationErrors.title && <span className="errors">{validationErrors.title}</span>}
//       </label>
//       <label>
//         Address:
//         <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
//         {validationErrors.address && <span className="errors">{validationErrors.address}</span>}
//       </label>
//       <label>
//         City:
//         <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
//         {validationErrors.city && <span className="errors">{validationErrors.city}</span>}
//       </label>
//       <label>
//         State:
//         <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
//         {validationErrors.state && <span className="errors">{validationErrors.state}</span>}
//       </label>
//       <label>
//         Country:
//         <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
//         {validationErrors.country && <span className="errors">{validationErrors.country}</span>}
//       </label>
//       <label>
//         Hours:
//         <input type="text" value={hours} onChange={(e) => setHours(e.target.value)} />
//         {validationErrors.hours && <span className="errors">{validationErrors.hours}</span>}
//       </label>
//       <label>
//         Description:
//         <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
//         {validationErrors.description && <span className="errors">{validationErrors.description}</span>}
//       </label>
//       <label>
//         imageUrl:
//         <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
//         {validationErrors.imageUrl && <span className="errors">{validationErrors.imageUrl}</span>}
//       </label>
//       <button type="submit">Create Listing</button>
//     </form>
//   );
// };

// export default CreateListingForm;
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNewListing } from "../../store/listings";
import "./Form.css";

const CreateListingForm = () => {
  const history = useHistory();
  let dispatch = useDispatch();

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

  const [validationErrors, setValidationErrors] = useState({});
  // const [invalid, setInvalid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};
    if (title?.length < 3) errors.title = "Title must be 3 or more characters";
    if (address.length === 0) errors.address = "Please enter a valid address";
    if (city.length === 0) errors.city = "Please enter a valid city";
    if (state.length === 0) errors.state = "Please enter a valid state";
    if (country.length === 0) errors.country = "Please enter a valid country";
    if (hours.length < 3 || hours.length > 5)
      errors.hours = "Please enter a valid time in this format: 9-5";
    if (description.length < 30)
      errors.description =
        "Please enter a description with more than 30 characters";

    if (!imageUrl) errors.imageUrl = "Image is required";

    // if (
    //   !imageUrl.endsWith(".png") &&
    //   !imageUrl.endsWith(".jpg") &&
    //   !imageUrl.endsWith(".jpeg")
    // ) {
    //   errors.imageUrl = "Image URL must end in .png, .jpg, .jpeg";
    // }

    setValidationErrors(errors);
  }, [title, address, city, state, country, hours, description, imageUrl]);

  const handleClick = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const formData = new FormData();
    setImageLoading(false);

    const errorArr = Object.values(validationErrors);

    if (errorArr.length > 0) {
      return;
    } else {
      formData.append("title", title);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("country", country);
      formData.append("hours", hours);
      formData.append("description", description);
      formData.append("image_url", imageUrl);
      const createdListing = await dispatch(createNewListing(formData));

      if (createdListing.id) {
        history.push(`/listings/${createdListing.id}`);
      }
    }
  };

  return (
    <>
      <form className="create-listing-form" onSubmit={handleClick}>
        <div className="form-group-container">
          <h3>Basics about your restaurant</h3>
          <div className="form-group-container">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              value={title}
              // placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* {validationErrors.title && (
            <span className="errors">{validationErrors.title}</span>
          )} */}
          </div>
        </div>
        {isSubmitted && (
          <span className="errors">{validationErrors.title}</span>
        )}
        <div className="form-group-container">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            value={address}
            // placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          {/* {validationErrors.address && (
            <span className="errors">{validationErrors.address}</span>
          )} */}
        </div>
        {isSubmitted && (
          <span className="errors">{validationErrors.address}</span>
        )}
        <div className="form-group-container">
          <label htmlFor="city">City</label>
          <input
            type="text"
            value={city}
            // placeholder="City"
            onChange={(e) => setCity(e.target.value)}
          />
          {/* {validationErrors.city && (
            <span className="errors">{validationErrors.city}</span>
          )} */}
        </div>
        {isSubmitted && <span className="errors">{validationErrors.city}</span>}
        <div className="form-group-container">
          <label htmlFor="state">State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          {/* {validationErrors.state && (
            <span className="errors">{validationErrors.state}</span>
          )} */}
        </div>
        {isSubmitted && (
          <span className="errors">{validationErrors.state}</span>
        )}
        <div className="form-group-container">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          {/* {validationErrors.country && (
            <span className="errors">{validationErrors.country}</span>
          )} */}
        </div>
        {isSubmitted && (
          <span className="errors">{validationErrors.country}</span>
        )}
        <div className="form-group-container">
          <label htmlFor="hours">Hours</label>
          <input
            type="text"
            value={hours}
            placeholder="format: '9-5'"
            onChange={(e) => setHours(e.target.value)}
          />
          {/* {validationErrors.hours && (
            <span className="errors">{validationErrors.hours}</span>
          )} */}
        </div>
        {isSubmitted && (
          <span className="errors">{validationErrors.hours}</span>
        )}
        <div className="form-group-container">
          {/* <h3>Describe your restaurant to people</h3>
          <p className="bio-margin">
            Mention the best features of your shop, including food, ambience,
            and how your restaurant started.
          </p> */}
          <label htmlFor="description"></label>
          <h3>Describe your restaurant</h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please write at least 30 characters"
            className="description-box"
          />
          {/* {validationErrors.description && (
            <span className="errors">{validationErrors.description}</span>
          )} */}
        </div>
        {isSubmitted && (
          <span className="errors">{validationErrors.description}</span>
        )}
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
        <button className="create-listing-button" type="submit">
          Create Listing
        </button>
      </form>
    </>
  );
};

export default CreateListingForm;
