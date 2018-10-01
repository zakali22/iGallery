import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../Navigation/Header";
import Slide from "react-reveal/Slide";

import { connect } from "react-redux";

class Discover extends Component {
  componentDidMount() {
    console.log(this.props.unsplash);
  }
  render() {
    const columns = this.props.unsplash;
    return (
      <div className="container">
        <Header />
        <div className="images__tile">
          {columns.map(column => {
            return (
              <Slide bottom>
                <div className="images__tile__column">
                  {column.map(image => {
                    return (
                      <div className="images__tile__column--container">
                        <img
                          src={image}
                          className="images__tile__column--image"
                        />
                      </div>
                    );
                  })}
                </div>
              </Slide>
            );
          })}
        </div>
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
