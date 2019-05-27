import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import NoteSingle from "./NoteSingle";
import Edit from "./Edit";
import "./NotesAll.less";

class NotesAll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allNotes: [],
      loading: false,
      dialogOpen: false
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

    this.addNote = (note, id) => {
      let copyState = [...this.state.allNotes];

      let addItem = note;
      addItem.id = id;
      console.log(addItem);
      copyState.push(addItem);
      this.setState({ allNotes: copyState });
    };

    this.setCustomState = state => {
      this.setState(state);
    };
  }

  componentDidMount() {
    this.fetchAllNotes();
  }

  render() {
    const { allNotes, loading } = this.state;
    return (
      <React.Fragment>
        <Grid container justify="space-evenly" spacing={2}>
          {loading ? (
            <React.Fragment>
              <Grid item>
                <NoteSingle lang={this.props.lang} loading={true} />
              </Grid>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {allNotes.map((key, index) => (
                <NoteSingle
                  lang={this.props.lang}
                  history={this.props.history}
                  key={index}
                  note={key}
                  deleteMethod={this.deleteMethod}
                />
              ))}
              <Fab
                onClick={() => this.setState({ dialogOpen: true })}
                className="fab__add"
                color="secondary"
              >
                <AddIcon />
              </Fab>
            </React.Fragment>
          )}
        </Grid>

        {this.state.dialogOpen && (
          <Edit
            lang={this.props.lang}
            open={this.state.dialogOpen}
            addMethod={this.addNote}
            setCustomState={this.setCustomState}
          />
        )}
      </React.Fragment>
    );
  }
}

NotesAll.propTypes = {
  lang: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
};

export default NotesAll;
