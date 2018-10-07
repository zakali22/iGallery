import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../Navigation/Header";
import { Form, Text, Scope } from "informed";
import { Link } from "react-router-dom";
import GoogleIcon from "../../img/icon-google.svg";
import FacebookIcon from "../../img/icon-facebook.svg";

import axios from "axios";

class Register extends Component {
  state = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    errors: []
  };
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

  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async () => {
    this.setState({
      errors: []
    });
    const res = await axios.post("/api/add", {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirm_password: this.state.confirm_password
    });
    if (res.data.error) {
      const errorsArray = this.state.errors;
      res.data.error.map(error => {
        errorsArray.push(error.msg);
      });
      console.log(errorsArray);
      this.setState({
        errors: errorsArray
      });
    } else if (res.data.exists) {
      const errorsArray = this.state.errors;
      errorsArray.push(res.data.exists.msg);
      this.setState({
        errors: errorsArray
      });
    } else {
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <div className="container">
        <Header className="header header--overall" />
        <div className="form-container">
          <h1>Register</h1>
          {this.state.errors.length > 0 ? (
            <div className="errors">
              <ul className="errors-list">
                {this.state.errors.map((error, i) => {
                  return <li key={i}>{error}</li>;
                })}
              </ul>
            </div>
          ) : null}
          <Form id="validate-form" method="post" action="#">
            <div className="side-by-side">
              <Text
                field="first_name"
                id="validate-first"
                name="first_name"
                placeholder="First name"
                validateOnChange
                validate={this.basicValidation}
                onChange={this.handleChange}
              />
              <Text
                field="last_name"
                id="validate-last"
                name="last_name"
                placeholder="Last name"
                validateOnChange
                validate={this.basicValidation}
                onChange={this.handleChange}
              />
            </div>
            <Text
              field="username"
              name="username"
              id="validate-username"
              placeholder="Username"
              validateOnChange
              validate={this.basicValidation}
              onChange={this.handleChange}
            />
            <Text
              field="email"
              name="email"
              id="validate-email"
              placeholder="Email"
              validateOnChange
              validate={this.basicValidation}
              onChange={this.handleChange}
            />
            <Text
              field="password"
              name="password"
              id="validate-password"
              placeholder="Password"
              type="password"
              onChange={this.handleChange}
            />
            <Text
              field="confirm_password"
              id="validate-confirm"
              name="confirm_password"
              placeholder="Confirm password"
              type="password"
              onChange={this.handleChange}
            />
            <button type="submit" onClick={this.handleSubmit}>
              Submit
            </button>
          </Form>
          <h5>or</h5>
          <div className="third-party">
            <a href="/auth/google" className="button-link">
              <button className="button-link--google">
                <img src={GoogleIcon} /> <p>Sign up with Google</p>
              </button>
            </a>
            <a href="/auth/facebook" className="button-link">
              <button className="button-link--facebook">
                <img src={FacebookIcon} /> <p>Sign up with Facebook</p>
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
