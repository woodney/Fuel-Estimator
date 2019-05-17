import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getAuthenticated } from "./Store/authentication/selectors";
import Quote from "./Quote";
import History from "./History";

const mapStateToProps = state => {
  const authenticated = getAuthenticated(state);
  return {
    authenticated
  };
};

class AppContent extends Component {
  render() {
    const { authenticated } = this.props;

    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute
              exact
              path="/profile"
              component={Profile}
              authorized={authenticated}
            />
            <PrivateRoute
              exact
              path="/quote"
              component={Quote}
              authorized={authenticated}
            />
            <PrivateRoute
              exact
              path="/history"
              component={History}
              authorized={authenticated}
            />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(AppContent);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return rest.authorized ? (
        <Component {...rest} {...props} />
      ) : (
        <Redirect to="/" />
      );
    }}
  />
);
