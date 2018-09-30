import React from "react";
import PropTypes from "prop-types";
import SearchIcon from "../../img/search.svg";

const Header = props => {
  return (
    <header className="header">
      <a href="#">
        <h3 className="header__logo">ig</h3>
      </a>
      <div className="header__searchContainer">
        <input
          type="text"
          name="searchString"
          className="header__searchContainer--input"
          placeholder="Search..."
        />
        <img src={SearchIcon} className="header__searchContainer--searchIcon" />
      </div>
      <nav class="header__nav">
        <div class="header__nav--item">
          <span class="header__nav--text">
            <a href="#">discover</a>
          </span>
        </div>
        <div class="header__nav--item">
          <span class="header__nav--text">
            <a href="#">register/login</a>
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
