import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Jumbotron from "./Jumbotron";
import { connect } from "react-redux";
import * as actions from "../../actions/unsplashActions";

class Homepage extends Component {
  componentDidMount() {
    this.props.getPhotos();
  }
  render() {
    return (
      <div className="container">
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

export default connect(
  mapStateToProps,
  actions
)(Homepage);
