import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import NoteSingle from "./NoteSingle";
import "./NotesAll.less";

class NotesAll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allNotes: [],
      loading: false
    };

    this.fetchAllNotes = async () => {
      this.setState({ loading: true });
      /**
       * "http://private-9aad-note10.apiary-mock.com/notes"
       * "http://jsonplaceholder.typicode.com/posts"
       */
      const fetchNotes = await fetch(
        "http://jsonplaceholder.typicode.com/posts"
      );
      const json = await fetchNotes.json();
      this.setState({ allNotes: json, loading: false });
    };

    this.deleteMethod = id => {
      let copyState = [...this.state.allNotes];
      const index = copyState.findIndex(key => key.id === id);
      console.log(index);
      copyState.splice(index, 1);
      console.log(copyState);
      this.setState({ allNotes: copyState, loading: true }, () =>
        this.setState({ loading: false })
      );
    };
  }

  componentDidMount() {
    this.fetchAllNotes();
  }

  render() {
    const { allNotes, loading } = this.state;
    return (
      <Grid container justify="space-evenly" spacing={2}>
        {loading ? (
          <React.Fragment>
            <Grid item>
              <NoteSingle loading={true} />
            </Grid>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {allNotes.map((key, index) => (
              <NoteSingle
                history={this.props.history}
                key={index}
                note={key}
                deleteMethod={this.deleteMethod}
              />
            ))}
          </React.Fragment>
        )}
      </Grid>
    );
  }
}

NotesAll.propTypes = {
  history: PropTypes.object.isRequired
};

export default NotesAll;
