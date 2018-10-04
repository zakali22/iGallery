import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchIcon from "../../img/search.svg";
import LogoIcon from "../../img/Logo.svg";
import { Link } from "react-router-dom";

class Header extends Component {
  state = {
    search: ""
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
          <div class="header__nav--item">
            <span class="header__nav--text">
              <Link to={"/register"}>register</Link>
            </span>
          </div>
          <div class="header__nav--item">
            <span class="header__nav--text">
              <Link to={"/login"}>login</Link>
            </span>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
