import React, { Component } from "react";
import PropTypes from "prop-types";
import HeaderHomepage from "../Navigation/HeaderHomepage";
import Jumbotron from "./Jumbotron";

class Homepage extends Component {
  render() {
    return (
      <div className="homepage">
        <HeaderHomepage />
        <Jumbotron />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    unsplash: state.unsplash
  };
};

export default Homepage;
