import React, { Component } from "react";
import PropTypes from "prop-types";
import Body from "../components/Body";
import NoteDetail from "../components/NoteDetail";

class NoteDetailPage extends Component {
  render() {
    return (
      <Body>
        <NoteDetail match={this.props.match} />
      </Body>
    );
  }
}

NoteDetailPage.propTypes = {
  match: PropTypes.object.isRequired
};

export default NoteDetailPage;
