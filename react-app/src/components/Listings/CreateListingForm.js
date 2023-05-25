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
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNewListing } from '../../store/listings';

const CreateListingForm = () => {

  const history = useHistory();
  let dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [validationErrors, setValidationErrors] = useState({});
  // const [invalid, setInvalid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};
    if (title.length < 3) errors.title = "Title must be 3 or more characters";
    if (address.length === 0) errors.address = "Please enter a valid address";
    if (city.length === 0) errors.city = "Please enter a valid city";
    if (state.length === 0) errors.state = "Please enter a valid state";
    if (country.length === 0) errors.country = "Please enter a valid country";
    if (hours.length < 3) errors.hours = "Please enter a valid time in this format: 9-5";
    if (description.length < 30) errors.description = "Please enter a description with more than 30 characters";


      if (imageUrl.length === 0)
        errors.imageUrl = "Image is required";

      if (
        !imageUrl.endsWith(".png") &&
        !imageUrl.endsWith(".jpg") &&
        !imageUrl.endsWith(".jpeg")
      ) {
        errors.previewImg = "Image URL must end in .png, .jpg, .jpeg";
      }

    setValidationErrors(errors);
  }, [title, address, city, state, country, hours, description, imageUrl]);

  const handleClick = async (e) => {
    // console.log("handle click submit function running");
    e.preventDefault();
    setIsSubmitted(true);

    const errorArr = Object.values(validationErrors);
    // console.log("this is errors array in handle click: ", errorArr);

    if (errorArr.length > 0) {
      // console.log("if errors array.lenth === 0 running");
      return;
    } else {
      const data = {
        title,
        address,
        city,
        state,
        country,
        hours,
        description,
        imageUrl
      };

        const createdListing = await dispatch(createNewListing(data));

        if (createdListing.id) {
          history.push(`/listings/${createdListing.id}`);
        }
    }
  };

  return (
    <div className="form-outer-div">
          <div className="form-data">

            <label htmlFor="">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
          </div>
          {isSubmitted && (
            <span className="errors">{validationErrors.title}</span>
          )}
          <div className="form-data">
            <label htmlFor="">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              required
            />
          </div>
          {isSubmitted && (
            <span className="errors">{validationErrors.address}</span>
          )}
          <div className="form-data-parent">
            <div className="form-data">
              <label htmlFor="">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                required
              />
            </div>
            {isSubmitted && (
              <span className="errors">{validationErrors.city}</span>
            )}
            <div className="form-data">
              <label htmlFor="">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="STATE"
                required
              />
            </div>
          </div>
          {isSubmitted && (
            <span className="errors">{validationErrors.state}</span>
          )}
 <div className="form-data">
              <label htmlFor="">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                required
              />
            </div>
            {isSubmitted && (
              <span className="errors">{validationErrors.country}</span>
            )}
             <div className="form-data">
              <label htmlFor="">Hours</label>
              <input
                type="text"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Hours"
                required
              />
            </div>
            {isSubmitted && (
              <span className="errors">{validationErrors.hours}</span>
            )}
          <div className="form-line"></div>

          <div className="form-data">
            <h3>Describe your restaurant to people</h3>
            <p className="bio-margin">
              Mention the best features of your shop, including food, ambience, and how your restaurant started.
            </p>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please write at least 30 characters"
              className="description-box"
              required
            />
          </div>
          {isSubmitted && (
            <span className="errors">{validationErrors.description}</span>
          )}

          <div className="form-line"></div>

            <div className="form-data">
              <h3>Liven up your spot with photos</h3>
              <p className="bio-margin">
                Submit a link to at least one photo to publish your spot. The
                first spot will be the preview image.
              </p>
              <div className="image-links">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="image URL"
                  required
                />
                {isSubmitted && (
                  <span className="errors">{validationErrors.imageUrl}</span>
                )}
              </div>

              <div className="form-line-1"></div>
            </div>
         {" "}
          <div className="form-submit-button">
             <button className="create-btn" onClick={handleClick}>
                Create Spot
              </button>

          </div>

    </div>
  );
};

export default CreateListingForm;
