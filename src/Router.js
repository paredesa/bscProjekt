import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import NavBar from "./components/NavBar";

export default class Router extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/notes" component={Notes} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}
