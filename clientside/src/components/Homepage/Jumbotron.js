import React from "react";
import PropTypes from "prop-types";
import ArrowIcon from "../../img/right-arrow.svg";
import { Link } from "react-router-dom";

const Jumbotron = props => {
  return (
    <div className="jumbotron-container">
      <div className="jumbotron-container--text">
        <h1>Find the moments you love best</h1>
        <p>Discover world-class beautiful and timeless photos</p>
      </div>
      <div className="container__button">
        <Link to={"/discover"}>
          <span class="container__button--text">Explore photos</span>
          <img src={ArrowIcon} className="container__button--icon" />
        </Link>
      </div>
    </div>
  );
};

export default Jumbotron;
