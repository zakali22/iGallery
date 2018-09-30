import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../Navigation/Header";
import Jumbotron from "./Jumbotron";

class Homepage extends Component {
  render() {
    return (
      <div className="homepage">
        <Header />
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
