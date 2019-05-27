import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import LanguageIcon from "@material-ui/icons/Language";
import "./NavBar.less";

export default class NavBar extends Component {
  render() {
    const { lang } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Link to="/">
              <IconButton color="inherit">
                <HomeIcon />
              </IconButton>
            </Link>
            <Link to="/notes">
              <IconButton color="inherit">
                <SpeakerNotesIcon />
              </IconButton>
            </Link>
            <div className="spacer" />
            {lang}
            <IconButton onClick={this.props.changeLang} color="inherit">
              <LanguageIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  lang: PropTypes.string.isRequired,
  changeLang: PropTypes.func.isRequired
};
