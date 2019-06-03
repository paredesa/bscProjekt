import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  CircularProgress
} from "@material-ui/core";
import "./Edit.less";

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: {},
      edit: false,
      loading: false
    };

    this.acceptClick = async () => {
      if (this.state.note.title.length > 0) {
        this.setState({ loading: true });
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
          this.setState({ loading: false });
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
          this.setState({ loading: false });
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
    const { lang, open, setCustomState } = this.props;
    const { edit, note, loading } = this.state;
    return (
      <Dialog
        classes={{ paper: "edit" }}
        scroll="body"
        fullWidth
        maxWidth="xs"
        className="edit"
        open={open}
        onClose={() => setCustomState({ dialogOpen: false })}
      >
        <DialogTitle>
          {edit ? (
            <React.Fragment>{lang.edit.title}</React.Fragment>
          ) : (
            <React.Fragment>{lang.add.title}</React.Fragment>
          )}
        </DialogTitle>
        <DialogContent className="edit__content">
          <div className="edit__content__field">
            <TextField
              fullWidth
              value={note.title}
              label={lang.label.title}
              multiline
              variant="outlined"
              onChange={e => {
                this.updateField("title", e.target.value);
              }}
            />
          </div>
          <div className="edit__content__field">
            <TextField
              fullWidth
              value={note.body}
              label={lang.label.desc}
              multiline
              variant="outlined"
              rows={8}
              onChange={e => {
                this.updateField("body", e.target.value);
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={loading}
            onClick={() => setCustomState({ dialogOpen: false })}
          >
            {lang.edit.cancel}
          </Button>
          <Button disabled={loading} onClick={this.acceptClick}>
            {loading ? (
              <CircularProgress size={20} />
            ) : (
              <React.Fragment>
                {edit ? (
                  <React.Fragment>{lang.edit.confirm}</React.Fragment>
                ) : (
                  <React.Fragment>{lang.add.confirm}</React.Fragment>
                )}
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
  lang: PropTypes.object.isRequired
};

export default Edit;
