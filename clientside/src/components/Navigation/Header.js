import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchIcon from "../../img/search.svg";
import LogoIcon from "../../img/Logo.svg";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../actions/authActions";

class Header extends Component {
  state = {
    search: "",
    showMenu: false
  };

  showMenu = event => {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  };

  closeMenu = event => {
    console.log(event.target);

    this.setState({ showMenu: false }, () => {
      document.removeEventListener("click", this.closeMenu);
    });
  };

  componentDidMount() {
    this.props.fetchUser();
  }

  // handleUserCheck = () => {
  //   switch (this.props.auth.user) {
  //     case null:
  //       return;
  //     case false || "":
  //       return (
  //         <React.Fragment>
  //           <div class="header__nav--item">
  //             <span class="header__nav--text">
  //               <Link to={"/register"}>register</Link>
  //             </span>
  //           </div>
  //           <div class="header__nav--item">
  //             <span class="header__nav--text">
  //               <Link to={"/login"}>login</Link>
  //             </span>
  //           </div>
  //         </React.Fragment>
  //       );
  //       break;
  //     default:
  //       return (
  //         <div className="logged_in_user--container">
  //           <div class="header__nav--user" onClick={this.showMenu}>
  //             <span class="header__nav--text">
  //               <img src={this.props.auth.user.image} />
  //             </span>
  //           </div>
  //           {this.state.showMenu ? (
  //             <div className="header__nav--dropdownMenu">
  //               <i class="fas fa-caret-up" />
  //               <Link to={"/profile"}>
  //                 <button>
  //                   {" "}
  //                   <p>Profile</p>
  //                 </button>
  //               </Link>
  //               <a href="/api/logout">
  //                 <button>
  //                   {" "}
  //                   <p>Logout</p>
  //                 </button>
  //               </a>
  //             </div>
  //           ) : null}
  //         </div>
  //       );
  //   }
  // };

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
          <form>
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
              <button type="submit">
                <img
                  src={SearchIcon}
                  className="header__searchContainer--searchIcon"
                />
              </button>
            </Link>
          </form>
        </div>
        <nav class="header__nav">
          <div class="header__nav--item">
            <span class="header__nav--text">
              <Link to={"/discover"}>discover</Link>
            </span>
          </div>
          // {this.handleUserCheck()}
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
