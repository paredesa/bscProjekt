import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LocalizedStrings from "react-localization";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import NavBar from "./components/NavBar";
import NoteDetail from "./pages/NoteDetailPage";

export default class Router extends Component {
  constructor() {
    super();

    this.lang = new LocalizedStrings({
      en: {
        home: {
          title: "Main page",
          button: "Notes"
        },
        edit: {
          title: "Edit note",
          cancel: "Cancel",
          confirm: "Edit"
        },
        add: {
          title: "Add note",
          confirm: "Add"
        },
        delete: {
          title: "Delete note",
          content: "Do you really want to delete this note ?",
          cancel: "Disagree",
          confirm: "Agree"
        },
        label: {
          title: "Title",
          desc: "Description"
        }
      },
      cs: {
        home: {
          title: "Hlavní stránka",
          button: "Poznámky"
        },
        edit: {
          title: "Upravit poznámku",
          cancel: "Zrušit",
          confirm: "Změnit"
        },
        add: {
          title: "Přidat poznámku",
          confirm: "Přidat"
        },
        delete: {
          title: "Smazat poznámku",
          content: "Opravdu chcete smazat tuto poznámku ?",
          cancel: "Nesouhlasím",
          confirm: "Souhlasím"
        },
        label: {
          title: "Název",
          desc: "Popis"
        }
      }
    });

    this.state = {
      lang: "EN"
    };

    this.changeLang = () => {
      this.lang.setLanguage(this.lang.getLanguage() === "en" ? "cs" : "en");
      this.setState({});
    };
  }

  componentDidMount() {
    this.lang.setLanguage("en");
    this.setState({});
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <NavBar lang={this.lang} changeLang={this.changeLang} />
          <Route
            exact
            path="/"
            render={props => <Home {...props} lang={this.lang} />}
          />
          <Route
            exact
            path="/notes"
            render={props => <Notes {...props} lang={this.lang} />}
          />
          <Route
            exact
            path="/notes/:id"
            render={props => <NoteDetail {...props} lang={this.lang} />}
          />
        </BrowserRouter>
      </React.Fragment>
    );
  }
}
