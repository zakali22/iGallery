import React from "react";
import PropTypes from "prop-types";
import Header from "../Navigation/Header";
import Jumbotron from "./Jumbotron";

const Homepage = props => {
  return (
    <div className="homepage">
      <Header className="header" />
      <Jumbotron />
    </div>
  );
};

export default Homepage;
