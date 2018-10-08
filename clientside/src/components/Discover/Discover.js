import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../Navigation/Header";
import Slide from "react-reveal/Slide";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../actions/unsplashActions";

class Discover extends Component {
  state = {
    counter: 2
  };
  componentDidMount() {
    this.props.getPhotos(1);
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  loadmore = () => {
    let countInc = this.state.counter;
    this.props.getPhotos(countInc);
    countInc++;
    this.setState({
      counter: countInc
    });
  };

  render() {
    return (
      <div>
        <Header className="header header--overall" />
        <h1>Discover</h1>
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
