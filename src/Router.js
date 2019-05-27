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
      lang: "EN"
    };

    this.changeLang = () => {
      this.setState({ lang: this.state.lang === "CZ" ? "EN" : "CZ" });
    };
  }
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <NavBar lang={this.state.lang} changeLang={this.changeLang} />
          <Route
            exact
            path="/"
            render={props => <Home {...props} lang={this.state.lang} />}
          />
          <Route
            exact
            path="/notes"
            render={props => <Notes {...props} lang={this.state.lang} />}
          />
          <Route
            exact
            path="/notes/:id"
            render={props => <NoteDetail {...props} lang={this.state.lang} />}
          />
        </BrowserRouter>
      </React.Fragment>
    );
  }
}
