import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import Background from "../assets/landing-img.svg";
import TitleLogo from "../assets/title-logo.svg";
import GoogleIcon from "../assets/google-icon.svg";

const styles = {
  container: {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${Background})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formRoot: {
    background: "#ffffff",
    padding: "40px 20px",
    width: "450px",
    maxWidth: "90vw",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },

  textField: {
    margin: "20px",
    width: "250px",
  },
  titleLogo: {
    backgroundImage: `url(${TitleLogo})`,
    width: "200px",
    height: "100px",
    margin: "0 0 20px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  googleIcon: {
    backgroundImage: `url(${GoogleIcon})`,
  },
  button: {
    width: "250px",
    margin: "20px",
  },
  links: {
    margin: "0 5px",
  },
  divider: { display: "flex", alignItems: "center" },
  dividerLine: {
    width: "100px",
    height: "1px",
    background: "#b3b3b3",
    margin: "0 5px",
  },
};

class Login extends Component {
  state = {
    email: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  };

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  render() {
    const { classes } = this.props;

    const googleIcon = (
      <Icon size="small" className={classes.googleIcon}></Icon>
    );

    return (
      <div className={classes.container}>
        <form className={classes.formRoot} noValidate autoComplete="off">
          <div className={classes.titleLogo}></div>

          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            startIcon={googleIcon}
            size="medium"
          >
            Login with Google
          </Button>

          <div className={classes.divider}>
            <span className={classes.dividerLine}></span>
            <Typography variant="subtitle2">OR</Typography>
            <span className={classes.dividerLine}></span>
          </div>

          <FormControl className={classes.textField}>
            <InputLabel htmlFor="inputEmail">Email</InputLabel>
            <Input
              id="inputEmail"
              type={"text"}
              value={this.state.email}
              onChange={this.handleChange("email")}
            />
          </FormControl>
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="inputPassword">Password</InputLabel>
            <Input
              id="inputPassword"
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password}
              onChange={this.handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {this.state.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            size="medium"
          >
            Log In
          </Button>
          <Typography variant="body2">
            New User?{" "}
            <Link
              href="#"
              className={classes.links}
              onClick={() => {
                console.info("Signup");
              }}
              variant="body2"
            >
              Sign up
            </Link>
            or
            <Link
              href="#"
              className={classes.links}
              onClick={() => {
                console.info("Demo User");
              }}
              variant="body2"
            >
              Login as Demo User
            </Link>
          </Typography>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
