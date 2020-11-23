import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import Background from "../assets/landing-img.svg";

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
    width: "30ch",
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

    return (
      <div className={classes.container}>
        <form className={classes.formRoot} noValidate autoComplete="off">
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
            <Input
              id="standard-adornment-password"
              type={"text"}
              value={this.state.email}
              onChange={this.handleChange("email")}
            />
          </FormControl>
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
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
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
