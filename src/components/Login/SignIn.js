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
import { connect } from "react-redux";

import GoogleIcon from "../../assets/google-icon.svg";
import Config from "../../utils/config";
import { LoadingThreadmill } from "../Loading";
import { loginWithGoogle, loginUser } from "../../services/authService";
import { setAuthState } from "../../store/actionCreators";

const styles = {
  formRoot: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  textField: {
    margin: "15px",
    width: "250px",
  },
  button: {
    width: "250px",
    margin: "20px",
  },
  googleIcon: {
    backgroundImage: `url(${GoogleIcon})`,
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
  successText: {
    color: "#33cc33",
  },
  failureText: {
    color: "#FF5050",
  },
};

class SignIn extends Component {
  state = {
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

  handleLoginInWithGoogle = async () => {
    await loginWithGoogle();
  };

  handleLoginUser = async (e) => {
    e.preventDefault();
    this.setState({ formMessage: "", waitingForResponse: true });
    var result = await loginUser(this.state.email, this.state.password);

    if (result.success) {
      this.setState({
        email: "",
        password: "",
        formMessage: "Logged in successfully",
        formMessageState: "successText",
        waitingForResponse: false,
      });
      this.props.setAuthState(true);
    } else
      this.setState({
        formMessage: result.message,
        formMessageState: "failureText",
        waitingForResponse: false,
      });
  };

  render() {
    const { classes } = this.props;

    const googleIcon = (
      <Icon size="small" className={classes.googleIcon}></Icon>
    );

    return (
      <form
        className={classes.formRoot}
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          this.handleLoginUser(e);
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
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          startIcon={googleIcon}
          size="medium"
          disabled={this.state.waitingForResponse}
          onClick={() => {
            this.handleLoginInWithGoogle();
          }}
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
            this.handleLoginUser(e);
          }}
        >
          Log In
        </Button>
        <Typography variant="body2">
          New User?{" "}
          <Link
            href="#"
            className={classes.links}
            onClick={() => {
              this.props.SetNewUser(true);
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
              this.setState({
                email: Config.testUserEmail,
                password: Config.testUserPassword,
              });
            }}
            variant="body2"
          >
            Login as Demo User
          </Link>
        </Typography>
      </form>
    );
  }
}

// export default withStyles(styles)(SignIn);
export default connect(null, { setAuthState })(withStyles(styles)(SignIn));
