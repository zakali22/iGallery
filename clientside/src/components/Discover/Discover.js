import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../Navigation/Header";
import Slide from "react-reveal/Slide";
import ReactDOM from "react-dom";

import { connect } from "react-redux";
import * as actions from "../../actions/unsplashActions";

class Discover extends Component {
  state = {
    counter: 2
  };
  componentDidMount() {
    console.log(this.props.unsplash);
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
    const columns = this.props.unsplash;
    console.log(columns);
    return (
      <div className="container">
        <Header />
        <div className="images__tile">
          {columns.map((column, i) => {
            return (
              <Slide bottom delay={i * 100}>
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
        <div className="loadmore">
          <div className="container__button" onClick={this.loadmore}>
            <span className="container__button--text">Load more</span>
          </div>
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
  actions
)(Discover);
