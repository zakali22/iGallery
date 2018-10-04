import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../Navigation/Header";
import Slide from "react-reveal/Slide";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../actions/unsplashActions";

class SearchResult extends Component {
  state = {
    counter: 2
  };
  componentDidMount() {
    console.log(this.props.match.params.search);
    this.props.searchPhoto(this.props.match.params.search, 1);
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  loadmore = () => {
    let countInc = this.state.counter;
    this.props.searchPhoto(this.props.match.params.search, countInc);
    countInc++;
    this.setState({
      counter: countInc
    });
  };

  renderResults() {
    const columns = this.props.unsplash.search;
    if (columns) {
      return (
        <div className="images__tile">
          {columns.map((column, i) => {
            return (
              <Slide bottom delay={i * 100}>
                <div className="images__tile__column">
                  {column.map((image, i) => {
                    return (
                      <div className="images__tile__column--container">
                        <Link to={`/photo/${image.photo.id}`}>
                          <img
                            src={image.photo.url}
                            className="images__tile__column--image"
                          />
                        </Link>
                        <span className="images__tile__column--details">
                          <img src={image.user.image} />
                          <a href={image.user.link}>
                            <p>{image.user.name}</p>
                          </a>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Slide>
            );
          })}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <Header className="header header--overall" />
        {this.renderResults()}
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
)(SearchResult);
