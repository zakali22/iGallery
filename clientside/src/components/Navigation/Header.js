import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchIcon from "../../img/search.svg";
import LogoIcon from "../../img/Logo.svg";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../actions/authActions";

class Header extends Component {
  state = {
    search: ""
  };

  componentDidMount() {
    this.props.fetchUser();
  }

  handleUserCheck = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <React.Fragment>
            <div class="header__nav--item">
              <span class="header__nav--text">
                <Link to={"/register"}>register</Link>
              </span>
            </div>
            <div class="header__nav--item">
              <span class="header__nav--text">
                <Link to={"/profile"}>login</Link>
              </span>
            </div>
          </React.Fragment>
        );
        break;
      default:
        return (
          <React.Fragment>
            <div class="header__nav--user">
              <span>
                <Link to={"/register"}>
                  <img src={this.props.auth.user.image} />
                </Link>
              </span>
            </div>
          </React.Fragment>
        );
    }
  };

  handleChange = e => {
    this.setState({
      search: e.target.value
    });
  };
  render() {
    return (
      <header className={this.props.className}>
        <Link to={"/"}>
          <img src={LogoIcon} className="header__logoIcon" />
        </Link>
        <div className="header__searchContainer">
          {/* Don't forget to change to ReactForm */}
          <input
            type="text"
            name="searchString"
            className="header__searchContainer--input"
            placeholder="Search high-resolution images"
            autoComplete="off"
            onChange={this.handleChange}
            value={this.state.search}
          />
          <Link to={`/search/${this.state.search}`}>
            <img
              src={SearchIcon}
              className="header__searchContainer--searchIcon"
            />
          </Link>
        </div>
        <nav class="header__nav">
          <div class="header__nav--item">
            <span class="header__nav--text">
              <Link to={"/discover"}>discover</Link>
            </span>
          </div>
          {this.handleUserCheck()}
        </nav>
      </header>
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
  actions
)(Header);
