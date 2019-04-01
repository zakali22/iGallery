import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../Navigation/Header";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

class Profile extends Component {
  render() {
    return (
      <div className="container">
        <Header className="header header--overall" />
        <div className="profile">
          <div className="profile__container">
            <img
              className="profile__container--image"
              src={this.props.auth.user.basic_info.image}
            />
            <div className="profile__container--details">
              <div className="profile__container--details-info">
                <h1>{this.props.auth.user.basic_info.name}</h1>
                <Link to={`/edit/${this.props.auth.user.basic_info._id}`}>
                  <button>Edit profile</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="profile__container-downloads">
            <div className="download--container">
              <div className="download--count">
                <p>
                  {this.props.auth.user.basic_info.downloadedImages.length}{" "}
                  Downloads
                </p>
              </div>
              <div className="download--images">
                {this.props.auth.user
                  ? this.props.auth.user.basic_info.downloadedImages.map(
                      image => {
                        return (
                          <div className="download--images__container">
                            <img src={image} />
                          </div>
                        );
                      }
                    )
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  null
)(Profile);
