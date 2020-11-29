import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { LoadingGears } from "./Loading";
import { getUserInfo } from "../services/profileService";
import { setUserData, setAuthState } from "../store/actionCreators";

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingAuthStatus: true,
    };
  }

  componentDidMount() {
    this.checkIfUserauthenticated();
  }

  async checkIfUserauthenticated() {
    if (this.props.isAuthenticated) {
      this.setState({
        checkingAuthStatus: false,
      });
      return;
    }

    const userInfoResult = await getUserInfo();
    if (userInfoResult.success) {
      this.props.setUserData(userInfoResult.data);
      this.props.setAuthState(true);
    }

    this.setState({ checkingAuthStatus: false });
  }
  render() {
    const { children, ...rest } = this.props;
    return this.state.checkingAuthStatus ? (
      <div className="screen-container screen-centered">
        <LoadingGears />
      </div>
    ) : (
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
export default connect(mapStateToProps, { setUserData, setAuthState })(
  PrivateRoute
);
