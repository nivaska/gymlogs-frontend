import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

class PrivateRoute extends Component {
  render() {
    const { children, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={({ location }) =>
          this.props.isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }
}
const mapStateToProps = (state) => {
  return { isAuthenticated: state.isAuthenticated };
};
export default connect(mapStateToProps)(PrivateRoute);
