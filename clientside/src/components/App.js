import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Homepage from "./Homepage/Homepage";
import Discover from "./Discover/Discover";

// Setting initial State
import { connect } from "react-redux";
import * as actions from "../actions/unsplashActions";

class App extends Component {
  componentWillMount() {
    this.props.getPhotos();
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/discover" component={Discover} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    unsplash: state.unsplash
  };
};
export default connect(
  mapStateToProps,
  actions
)(App);
