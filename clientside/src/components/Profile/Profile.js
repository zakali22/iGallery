import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../Navigation/Header";

class Profile extends Component {
  render() {
    return (
      <div className="container">
        <Header className="header header--overall" />
      </div>
    );
  }
}

export default Profile;
