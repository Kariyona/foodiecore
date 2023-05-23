import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllListings } from "../../store/listings";
import ListingIndexItem from "./ListingIndexItem";
import "./Listings.css";
import Slider from "react-slick";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        // display: "block",
        background: "lightpink",
        margin: "50px",
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        // display: "block",
        background: "lightpink",
        margin: "50px",
      }}
      onClick={onClick}
    />
  );
}

function Listing() {
  const dispatch = useDispatch();
  const storeListings = useSelector((state) => state.listings);
  console.log("this is state", storeListings);

  useEffect(() => {
    dispatch(getAllListings());
  }, [dispatch]);

  const listings = storeListings.allListings;

  const settings = {
    dots: true,
    infinite: false,
    speed: 400,
    draggable: true,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    accessibility: true,
    focusOnSelect: true,
    easing: "linear",
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 4,
    prevArrow: <NextArrow />,
    nextArrow: <PrevArrow />,
    initialSlide: 5,
    pauseOnHover: true,
  };

  return (
    <>
      <div className="index-container">
        <div className="first-card-text">
          <h1>Check out these delicious food spots!</h1>
          <div className="categories">
            <p>Breakfast v</p>
            <p>Lunch v</p>
            <p>Dinner v</p>
            <p>Dessert v</p>
            <p>Beverages v</p>
          </div>
          {/* <i class="fa-solid fa-arrow-right"></i> */}
        </div>

        <Slider {...settings}>
          {Object.values(listings).map((listing) => (
            <div className="carousel-item" key={listing.id}>
              <ListingIndexItem key={listing.id} listing={listing} />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}

export default Listing;
