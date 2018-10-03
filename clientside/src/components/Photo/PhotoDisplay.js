import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../Navigation/Header";
import { connect } from "react-redux";
import * as actions from "../../actions/unsplashActions";
import axios from "axios";

class PhotoDisplay extends Component {
  state = {
    image: null
  };
  componentDidMount() {
    this.props.getPhoto(this.props.match.params.id);
  }

  downloadPhoto = async link => {
    const id = this.props.match.params.id;
    const res = await axios.post(`/api/unsplash/getPhoto/${id}`, {
      link: link
    });
    console.log(res.data);
  };

  renderPhotoDetails() {
    const image = this.props.unsplash.image;
    if (image) {
      return (
        <div className="photo__container">
          <div className="photo__container--details">
            <a href={image.user.link}>
              <span className="photo__container--user">
                <img src={image.user.image} />
                <div className="photo__container--user__nameDetails">
                  <p>{image.user.name}</p>
                  <p>@{image.user.username}</p>
                </div>
              </span>
            </a>
            <span className="photo__container--photoInfo">
              <i class="fas fa-heart" />
              <p>{image.user.likes}</p>
              <button
                onClick={this.downloadPhoto.bind(this, image.downloadLink)}
                className="photo__container--photoInfo__button"
              >
                Download
              </button>
            </span>
          </div>
          <img src={image.photo} className="photo__container--image" />
        </div>
      );
    }
  }
  render() {
    return (
      <div className="container">
        <Header />
        {this.renderPhotoDetails()}
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
)(PhotoDisplay);
