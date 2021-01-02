import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Background from "../../assets/landing-img.svg";
import TitleLogo from "../../assets/title-logo.svg";

const styles = {
  container: {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${Background})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    background: "#ffffff",
    padding: "40px 20px 30px",
    width: "450px",
    maxWidth: "90vw",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  titleLogo: {
    backgroundImage: `url(${TitleLogo})`,
    width: "150px",
    height: "75px",
    margin: "0 0 20px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
};

class Login extends Component {
  state = {
    isNewUser: false,
  };

  setNewUser(isNewUser) {
    this.setState({ isNewUser });
  }

  render() {
    const { classes } = this.props;

    return this.props.isAuthenticated ? (
      <Redirect
        to={{
          pathname: "/home",
        }}
      />
    ) : (
      <div className={classes.container}>
        <div className={classes.formContainer}>
          <div className={classes.titleLogo}></div>

          {this.state.isNewUser ? (
            <SignUp SetNewUser={(isNewUser) => this.setNewUser(isNewUser)} />
          ) : (
            <SignIn SetNewUser={(isNewUser) => this.setNewUser(isNewUser)} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isAuthenticated: state.isAuthenticated };
};

export default connect(mapStateToProps)(withStyles(styles)(Login));
