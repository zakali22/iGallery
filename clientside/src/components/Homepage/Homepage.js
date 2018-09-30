import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Jumbotron from "./Jumbotron";

const Homepage = props => {
  return (
    <div className="container">
      <Header />
      <Jumbotron />
    </div>
  );
};

export default Homepage;
