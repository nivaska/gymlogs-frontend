import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";

import "../App.css";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import Login from "./Login/Login";
import appTheme from "../utils/appTheme";

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <MuiThemeProvider theme={appTheme}>
          <Router>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/home">
                <Home />
              </PrivateRoute>
              <PrivateRoute path="/">
                <Home />
              </PrivateRoute>
            </Switch>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
