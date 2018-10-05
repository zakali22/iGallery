import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../Navigation/Header";
import { Form, Text, Scope } from "informed";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import { connect } from "react-redux";

class Edit extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: ""
  };
  basicValidation = (value, name) => {
    return !value || value.length < 1 ? `Field must be entered` : null;
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async () => {
    const res = await axios.post(`/api/edit/${this.props.auth.user._id}`, {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      name: `${this.state.first_name} ${this.state.last_name}`
    });
    this.props.history.push("/profile");
  };

  render() {
    return (
      <div className="container">
        <Header className="header header--overall" />
        <div className="form-container">
          <h1>Edit Profile</h1>
          <Form id="validate-form">
            <React.Fragment>
              <Text
                field="first_name"
                name="first_name"
                id="validate-firstname"
                placeholder="First name"
                validateOnChange
                validateOnBlur
                validate={this.basicValidation}
                onChange={this.handleChange}
              />
              <Text
                field="last_name"
                name="last_name"
                id="validate-lastname"
                placeholder="Last name"
                validateOnChange
                validateOnBlur
                validate={this.basicValidation}
                onChange={this.handleChange}
              />
              <Text
                field="email"
                name="email"
                id="validate-email"
                placeholder="Email"
                validateOnChange
                validateOnBlur
                validate={this.passwordLengthValidation}
                onChange={this.handleChange}
              />
              <button type="submit" onClick={this.handleSubmit}>
                Submit
              </button>
            </React.Fragment>
          </Form>
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
)(Edit);
