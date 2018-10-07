import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../Navigation/Header";
import { Form, Text, Scope } from "informed";
import { Link } from "react-router-dom";
import GoogleIcon from "../../img/icon-google.svg";
import FacebookIcon from "../../img/icon-facebook.svg";

import axios from "axios";
import { connect } from "react-redux";
class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async () => {
    const res = await axios.post("/api/logUser", {
      username: this.state.username,
      password: this.state.password
    });
    if (res.data.success) {
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div className="container">
        <Header className="header header--overall" />
        <div className="form-container">
          <h1>Login</h1>
          <Form id="validate-form">
            <Text
              field="username"
              name="username"
              id="validate-username"
              placeholder="Username"
              onChange={this.handleChange}
            />
            <Text
              field="password"
              name="password"
              id="validate-password"
              placeholder="Password"
              onChange={this.handleChange}
              type="password"
            />
            <button type="submit" onClick={this.handleSubmit}>
              Submit
            </button>
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

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  null
)(Login);
