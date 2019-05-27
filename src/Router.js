import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import NavBar from "./components/NavBar";
import NoteDetail from "./pages/NoteDetailPage";

export default class Router extends Component {
  constructor() {
    super();

    this.state = {
      lang: "CZ"
    };
  }
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <NavBar />
          <Route
            exact
            path="/"
            render={props => <Home {...props} lang={this.state.lang} />}
          />
          <Route exact path="/notes" component={Notes} />
          <Route exact path="/notes/:id" component={NoteDetail} />
        </BrowserRouter>
      </React.Fragment>
    );
  }
}
