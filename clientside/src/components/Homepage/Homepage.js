import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import ChevronIcon from "../../img/right-chevron.svg";

const Homepage = props => {
  return (
    <div className="container">
      <Header />
      <div className="jumbotron-container">
        <div className="jumbotron-container--text">
          <h1>Find the moments you love best</h1>
          <p>Discover world-class beautiful and timeless photos</p>
        </div>
        <div className="container__button">
          <a href="#">
            <span class="container__button--text">Explore photos</span>
            <img src={ChevronIcon} className="container__button--icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
