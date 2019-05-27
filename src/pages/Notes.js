import React, { Component } from "react";
import PropTypes from "prop-types";
import Body from "../components/Body";
import NotesAll from "../components/NotesAll";

export default class Notes extends Component {
  render() {
    return (
      <div>
        <Body>
          <NotesAll history={this.props.history} />
        </Body>
      </div>
    );
  }
}

Notes.propTypes = {
  history: PropTypes.object.isRequired
};
