import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
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
      if (this.state.note.title.length > 0) {
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
            const response = await fetch(
              "http://jsonplaceholder.typicode.com/posts",
              {
                method: "POST",
                body: JSON.stringify(this.state.note)
              }
            );
            const json = await response.json();
            this.props.setCustomState({
              dialogOpen: false
            });
            this.props.addMethod(this.state.note, json.id);
          } catch (error) {
            console.log(error);
          }
        }
      }
    };

    this.updateField = (state, value) => {
      let copyState = { ...this.state.note };
      copyState[`${state}`] = value.trim();
      this.setState({ note: copyState });
    };
  }

  componentDidMount() {
    this.setState({
      note: this.props.note ? this.props.note : { title: "" },
      edit: this.props.edit ? this.props.edit : false
    });
  }
  render() {
    const { lang } = this.props;
    const { edit } = this.state;
    return (
      <Dialog
        className="edit"
        open={this.props.open}
        onClose={() => this.props.setCustomState({ dialogOpen: false })}
      >
        <DialogTitle>
          {edit ? (
            <React.Fragment>
              {lang === "CZ" && "Upravit poznámku"}
              {lang === "EN" && "Edit note"}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {lang === "CZ" && "Přidat poznámku"}
              {lang === "EN" && "Add note"}
            </React.Fragment>
          )}
        </DialogTitle>
        <DialogContent className="edit__content">
          <div className="edit__content__field">
            <TextField
              value={this.state.note.title}
              label={lang === "CZ" ? "Název" : "Title"}
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
              label={lang === "CZ" ? "Popis" : "Description"}
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
            {lang === "CZ" && "Zrušit"}
            {lang === "EN" && "Cancel"}
          </Button>
          <Button onClick={this.acceptClick}>
            {this.state.edit ? (
              <React.Fragment>
                {lang === "CZ" && "Upravit"}
                {lang === "EN" && "Edit"}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {lang === "CZ" && "Potvrdit"}
                {lang === "EN" && "Confirm"}
              </React.Fragment>
            )}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

Edit.propTypes = {
  open: PropTypes.bool.isRequired,
  addMethod: PropTypes.func,
  setCustomState: PropTypes.func.isRequired,
  note: PropTypes.object,
  edit: PropTypes.bool,
  lang: PropTypes.string.isRequired
};

export default Edit;
