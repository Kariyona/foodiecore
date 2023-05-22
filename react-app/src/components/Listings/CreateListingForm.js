import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNewListing } from '../../store/listings';

const CreateListingForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const listing = await dispatch(
      createNewListing({
        title,
        address,
        city,
        state,
        country,
        hours,
        description,
        image_url: imageUrl,
      })
    );
    if (!listing.errors) {
      history.push(`/listings/${listing.id}`);
    }
  };

  return (
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
      <button type="submit">Create Listing</button>
    </form>
  );
};

export default CreateListingForm;
