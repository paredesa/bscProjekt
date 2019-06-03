import React, { Component } from "react";
import PropTypes from "prop-types";
import Body from "../components/Body";
import NoteDetail from "../components/NoteDetail";

class NoteDetailPage extends Component {
  render() {
    return (
      <Body>
        <NoteDetail
          lang={this.props.lang}
          match={this.props.match}
          history={this.props.history}
        />
      </Body>
    );
  }
}

NoteDetailPage.propTypes = {
  lang: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default NoteDetailPage;
