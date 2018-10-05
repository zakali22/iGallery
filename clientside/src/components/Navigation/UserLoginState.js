import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

class UserLoginState extends Component {
  state = {
    showMenu: false
  };

  showMenu = event => {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  };

  closeMenu = event => {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener("click", this.closeMenu);
      });
    }
  };
  handleUserCheck = () => {
    switch (this.props.auth.user) {
      case null:
        return;
      case false || "":
        return (
          <React.Fragment>
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
          </React.Fragment>
        );
        break;
      default:
        return (
          <div className="logged_in_user--container">
            <div class="header__nav--user" onClick={this.showMenu}>
              <span class="header__nav--text">
                <img src={this.props.auth.user.image} />
              </span>
            </div>
            {this.state.showMenu ? (
              <div
                className="header__nav--dropdownMenu"
                ref={element => {
                  this.dropdownMenu = element;
                }}
              >
                <i class="fas fa-caret-up" />
                <Link to={"/profile"}>
                  <button>
                    {" "}
                    <p>Profile</p>
                  </button>
                </Link>
                <a href="/api/logout">
                  <button>
                    {" "}
                    <p>Logout</p>
                  </button>
                </a>
              </div>
            ) : null}
          </div>
        );
    }
  };
  render() {
    return <React.Fragment>{this.handleUserCheck()}</React.Fragment>;
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
)(UserLoginState);
