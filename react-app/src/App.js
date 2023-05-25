import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Listings from './components/Listings/index';
import ListingDetails from './components/Listings/ListingDetails'
import Listing from "./components/Listings/index";
import CreateListingForm from "./components/Listings/CreateListingForm"
import UpdateListingForm from "./components/Listings/UpdateListingForm";
import CreateReviewForm from "./components/Reviews/CreateReviewForm";
import UserListings from "./components/Listings/UserListings";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user)
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/listings/new">
            <CreateListingForm />
          </Route>
          <Route path="/listings" exact={true}>
            <Listing />
          </Route>
          <Route path="/listings/:listingId/edit">
            <UpdateListingForm />
          </Route>
          <Route path="/listings/:listingId">
            <ListingDetails />
          </Route>
          <Route path="/profile/:id" exact={true}>
            <UserListings />
          </Route>

            <Route path="/" >
            <Listing />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
