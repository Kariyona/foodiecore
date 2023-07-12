import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./splash.css";

const Splash = () => {
  return (
    <>
      <div className="splash-page-container">
        <div className="splash-left">
          <div className="splash-left-content">
            <img className="logo-image" src="https://i.imgur.com/G8hTFdy.jpg" />
          </div>
        </div>
        <div className="splash-right">
          <div className="splash-right-content">
            Click to get started
            <div className="right-arrow">
              <NavLink to="/listings">
                <i className="fa-solid fa-arrow-circle-right"></i>
              </NavLink>
            </div>
            <div className="about-links">
            <a href="https://github.com/Kariyona" title="GitHub" target="_blank">
              <i className="fa-brands fa-github" title="GitHub"></i></a>
            <a href="https://www.linkedin.com/in/wyonadev/" title="LinkedIn" target="_blank">
              <i className="fa-brands fa-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Splash;
