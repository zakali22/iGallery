import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../Navigation/Header";
import { Form, Text, Scope } from "informed";
import { Link } from "react-router-dom";
import GoogleIcon from "../../img/icon-google.svg";
import FacebookIcon from "../../img/icon-facebook.svg";

class Login extends Component {
  basicValidation = (value, name) => {
    return !value || value.length < 1 ? `Field must be entered` : null;
  };

  passwordLengthValidation = value => {
    return !value || value.length < 5
      ? "Passsword must be at least 5 characters"
      : null;
  };
  render() {
    return (
      <div className="container">
        <Header className="header header--overall" />
        <div className="form-container">
          <h1>Login</h1>
          <Form id="validate-form" method="post" action="#">
            <Text
              field="email"
              name="email"
              id="validate-email"
              placeholder="Email"
              validateOnChange
              validateOnBlur
              validate={this.basicValidation}
            />
            <Text
              field="password"
              name="password"
              id="validate-password"
              placeholder="Password"
              validateOnChange
              validateOnBlur
              validate={this.passwordLengthValidation}
            />
            <button type="submit">Submit</button>
          </Form>
          <h5>or</h5>
          <div className="third-party">
            <a href="/auth/google" className="button-link">
              <button className="button-link--google">
                <img src={GoogleIcon} /> <p>Sign in with Google</p>
              </button>
            </a>
            <a href="/auth/facebook" className="button-link">
              <button className="button-link--facebook">
                <img src={FacebookIcon} /> <p>Sign in with Facebook</p>
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
