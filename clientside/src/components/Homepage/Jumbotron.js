import React from "react";
import PropTypes from "prop-types";
import ArrowIcon from "../../img/right-arrow.svg";

const Jumbotron = props => {
  return (
    <div className="jumbotron-container">
      <div className="jumbotron-container--text">
        <h1>Find the moments you love best</h1>
        <p>Discover world-class beautiful and timeless photos</p>
      </div>
      <div className="container__button">
        <a href="#">
          <span class="container__button--text">Explore photos</span>
          <img src={ArrowIcon} className="container__button--icon" />
        </a>
      </div>
    </div>
  );
};

export default Jumbotron;
