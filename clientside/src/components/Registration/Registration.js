import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../Navigation/Header";
import { Form, Text, Scope } from "informed";
import { Link } from "react-router-dom";
import GoogleIcon from "../../img/icon-google.svg";
import FacebookIcon from "../../img/icon-facebook.svg";

class Register extends Component {
  basicValidation = (value, name) => {
    return !value || value.length < 1 ? `Field must be entered` : null;
  };

  passwordLengthValidation = value => {
    return !value || value.length < 5
      ? "Passsword must be at least 5 characters"
      : null;
  };

  matchValidation = (value, values) => {
    return values.password !== values.confirm_password
      ? "Passwords must match"
      : null;
  };

  passwordValidation = (value, values) => {
    return (
      this.passwordLengthValidation(value) ||
      this.matchValidation(value, values)
    );
  };
  render() {
    return (
      <div className="container">
        <Header className="header header--overall" />
        <div className="form-container">
          <h1>Register</h1>
          <Form id="validate-form" method="post" action="#">
            <div className="side-by-side">
              <Text
                field="first_name"
                id="validate-first"
                name="first_name"
                placeholder="First name"
                validateOnChange
                validate={this.basicValidation}
              />
              <Text
                field="last_name"
                id="validate-last"
                name="last_name"
                placeholder="Last name"
                validateOnChange
                validate={this.basicValidation}
              />
            </div>
            <Text
              field="email"
              name="email"
              id="validate-email"
              placeholder="Email"
              validateOnChange
              validate={this.basicValidation}
            />
            <Text
              field="password"
              name="password"
              id="validate-password"
              placeholder="Password"
              validateOnChange
              validate={this.passwordValidation}
              notify={["confirm_password"]}
            />
            <Text
              field="confirm_password"
              id="validate-confirm"
              name="confirm_password"
              placeholder="Confirm password"
              validateOnChange
              validate={this.passwordValidation}
              notify={["password"]}
            />
            <button type="submit">Submit</button>
          </Form>
          <div className="third-party">
            <Link to={"/auth/google"} className="button-link">
              <button className="button-link--google">
                <img src={GoogleIcon} /> <p>Sign up with Google</p>
              </button>
            </Link>
            <Link to={"/auth/facebook"} className="button-link">
              <button className="button-link--facebook">
                <img src={FacebookIcon} /> <p>Sign up with Facebook</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
