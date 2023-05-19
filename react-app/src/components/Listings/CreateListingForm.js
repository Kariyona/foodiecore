import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createNewListing } from "../../store/listings";
import Form from "./Form";

function CreateListingForm() {
  const listing = {
    title: "",
    address: "",
    city: "",
    state: "",
    country: "",
    hours: "",
    description: "",
    image_url: ""
  }

  return (
    <Form listing={listing}
    type="CreateListingForm"/>

  );
}

export default CreateListingForm;
