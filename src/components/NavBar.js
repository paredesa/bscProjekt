import React, { Component } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import "./NavBar.less";

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Button variant="contained" color="secondary">
              Click
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
