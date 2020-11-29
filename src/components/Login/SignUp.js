import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import { registerUser } from "../../services/authService";
import { LoadingThreadmill } from "../Loading";

const styles = {
  formRoot: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    transition: "transform 0.6s ease-in-out",
  },
  textField: {
    margin: "15px",
    width: "250px",
  },
  button: {
    width: "250px",
    margin: "20px",
  },
  links: {
    margin: "0 5px",
  },
  successText: {
    color: "#33cc33",
  },
  failureText: {
    color: "#FF5050",
  },
};

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    showPassword: false,
    waitingForResponse: false,
    formMessage: "",
    formMessageState: "",
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

  handleRegisterUser = async (e) => {
    e.preventDefault();
    this.setState({ formMessage: "", waitingForResponse: true });
    var result = await registerUser(
      this.state.name,
      this.state.email,
      this.state.password
    );

    if (result.success)
      this.setState({
        name: "",
        email: "",
        password: "",
        formMessage: "Account created successfully",
        formMessageState: "successText",
        waitingForResponse: false,
      });
    else
      this.setState({
        formMessage: result.message,
        formMessageState: "failureText",
        waitingForResponse: false,
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <form
        className={classes.formRoot}
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          this.handleRegisterUser(e);
        }}
      >
        <LoadingThreadmill visible={this.state.waitingForResponse} />

        {this.state.formMessage ? (
          <Typography
            variant="body2"
            className={classes[this.state.formMessageState]}
          >
            {this.state.formMessage}
          </Typography>
        ) : null}
        <FormControl className={classes.textField}>
          <InputLabel htmlFor="inputName">Name</InputLabel>
          <Input
            id="inputName"
            type={"text"}
            value={this.state.name}
            onChange={this.handleChange("name")}
          />
        </FormControl>
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
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
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
          disabled={this.state.waitingForResponse}
          onClick={(e) => {
            this.handleRegisterUser(e);
          }}
        >
          Sign Up
        </Button>
        <Typography variant="body2">
          Existing User?{" "}
          <Link
            href="#"
            className={classes.links}
            onClick={() => {
              this.props.SetNewUser(false);
            }}
            variant="body2"
          >
            Log In
          </Link>
        </Typography>
      </form>
    );
  }
}

export default withStyles(styles)(SignUp);
