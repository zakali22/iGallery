import React from "react";
import PropTypes from "prop-types";
import SearchIcon from "../../img/search.svg";
import LogoIcon from "../../img/Logo.svg";
import { Link } from "react-router-dom";

const Header = props => {
  return (
    <header className="header">
      <Link to={"/"}>
        <img src={LogoIcon} className="header__logoIcon" />
      </Link>
      <div className="header__searchContainer">
        {/* Don't forget to change to ReactForm */}
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
};

export default Header;
