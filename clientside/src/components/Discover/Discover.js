import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../Navigation/Header";

import { connect } from "react-redux";

class Discover extends Component {
  componentDidMount() {
    console.log(this.props.unsplash);
  }
  render() {
    return (
      <div className="container">
        <Header />
        <div className="imageTiles" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    unsplash: state.unsplash
  };
};

export default connect(
  mapStateToProps,
  null
)(Discover);
