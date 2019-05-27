import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  Button
} from "@material-ui/core";
import "./Edit.less";

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: {},
      edit: false
    };

    this.acceptClick = async () => {
      if (this.state.edit) {
        try {
          await fetch(
            "http://jsonplaceholder.typicode.com/posts/" + this.state.note.id,
            {
              method: "PUT",
              body: JSON.stringify(this.state.note)
            }
          );
          this.props.setCustomState({
            note: this.state.note,
            dialogOpen: false
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await fetch("http://jsonplaceholder.typicode.com/posts/", {
            method: "POST",
            body: JSON.stringify(this.state.note)
          });
          this.props.setCustomState({
            note: this.state.note,
            dialogOpen: false
          });
        } catch (error) {
          console.log(error);
        }
      }
    };

    this.updateField = (state, value) => {
      let copyState = { ...this.state.note };
      copyState[`${state}`] = value;
      this.setState({ note: copyState });
    };
  }

  componentDidMount() {
    this.setState({
      note: this.props.note ? this.props.note : {},
      edit: this.props.edit ? this.props.edit : false
    });
  }
  render() {
    return (
      <Dialog
        className="edit"
        open={this.props.open}
        onClose={() => this.props.setCustomState({ dialogOpen: false })}
      >
        <DialogTitle>Upravit poznámku</DialogTitle>
        <DialogContent className="edit__content">
          <div className="edit__content__field">
            <TextField
              value={this.state.note.title}
              label="Název"
              multiline
              variant="outlined"
              onChange={e => {
                this.updateField("title", e.target.value);
              }}
            />
          </div>
          <div className="edit__content__field">
            <TextField
              value={this.state.note.body}
              label="Popis"
              multiline
              variant="outlined"
              rows={4}
              onChange={e => {
                this.updateField("body", e.target.value);
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => this.props.setCustomState({ dialogOpen: false })}
          >
            Zrušit
          </Button>
          <Button onClick={this.acceptClick}>
            {this.state.edit ? (
              <React.Fragment>Upravit</React.Fragment>
            ) : (
              <React.Fragment>Přidat</React.Fragment>
            )}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

Edit.propTypes = {
  open: PropTypes.bool.isRequired,
  setCustomState: PropTypes.func.isRequired,
  note: PropTypes.object,
  edit: PropTypes.bool
};

export default Edit;
