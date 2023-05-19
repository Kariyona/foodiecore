import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

function NewListingForm() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [hours, setHours] = useState("");
    const [description, setDescription] = useState("");
    const [image_url, setImageUrl] = useState("");
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (errors.length) {
            setSubmitted(true)
            return
        }
    }




    return (
        <>
        <h1>Create a New Listing</h1>
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => (
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
    )
}
