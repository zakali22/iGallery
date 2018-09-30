import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../Navigation/Header";
import { connect } from "react-redux";
import * as actions from "../../actions/unsplashActions";

class Discover extends Component {
  componentDidMount() {
    this.props.getPhotos();
  }
  render() {
    return (
      <div className="container">
        <Header />
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
  actions
)(Discover);
