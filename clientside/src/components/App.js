import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Homepage from "./Homepage/Homepage";
import Discover from "./Discover/Discover";
import PhotoDisplay from "./Photo/PhotoDisplay";
import SearchResult from "./Search/SearchResult";

// Setting initial State
import { connect } from "react-redux";
import * as actions from "../actions/unsplashActions";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/discover" component={Discover} />
            <Route exact path="/photo/:id" component={PhotoDisplay} />
            <Route exact path="/search/:search" component={SearchResult} />
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
