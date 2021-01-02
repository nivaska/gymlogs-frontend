import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Config from "../../utils/config"
import GoogleIcon from "../../assets/google-icon.svg";
import {loginWithGoogle} from "../../services/authService"
const styles = {
  button: {
    width: "250px",
    margin: "20px",
  },
  googleIcon: {
    backgroundImage: `url(${GoogleIcon})`,
  },
};

class GoogleSignin extends Component {

  responseGoogleSuccess = async (response) => {
    console.log(response)
    const result = await loginWithGoogle(response.tokenId)
    this.props.SetResult(result);
  }

  responseGoogleError = (response) => {
    console.log(response)
    this.props.SetResult({success: false, message: "Google Authorization Failed."});
  }

  render() {
    const { classes } = this.props;
    const googleIcon = (
      <Icon size="small" className={classes.googleIcon}></Icon>
    );

    return (
      <GoogleLogin
        clientId={Config.googleClientId}
        buttonText="Login"
        onSuccess={this.responseGoogleSuccess}
        onFailure={this.responseGoogleError}
        cookiePolicy={"single_host_origin"}
        render={renderProps => (
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            startIcon={googleIcon}
            size="medium"
            onClick={renderProps.onClick}
            disabled={this.props.Disabled || renderProps.disabled}
          >
            Login with Google
          </Button>
        )}
      />
    );
  }
}

export default withStyles(styles)(GoogleSignin);
