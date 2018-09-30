import React, { Component } from "react";
import Homepage from "./Homepage/Homepage";
import { connect } from "react-redux";
import { getPhotos } from "../actions/unsplashActions";

class App extends Component {
  componentDidMount() {
    this.props.getPhotos();
  }
  render() {
    return (
      <React.Fragment>
        <Homepage />
      </React.Fragment>
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
  getPhotos
)(App);
