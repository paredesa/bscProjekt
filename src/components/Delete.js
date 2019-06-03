import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  CircularProgress
} from "@material-ui/core";

class Delete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };

    this.deleteClick = async () => {
      this.setState({ loading: true });
      try {
        await fetch(
          "http://jsonplaceholder.typicode.com/posts/" + this.props.id,
          {
            method: "DELETE"
          }
        );
        this.props.setCustomState({ deleteDialog: false });
        this.props.deleteMethod(this.props.id);
      } catch (error) {
        console.log(error);
      }

      this.setState({ loading: false });
    };
  }

  render() {
    const { loading } = this.state;
    const { lang, open, setCustomState } = this.props;
    return (
      <Dialog
        open={open}
        onClose={() => {
          setCustomState({ deleteDialog: false });
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{lang.delete.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {lang.delete.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={loading}
            onClick={() => {
              setCustomState({ deleteDialog: false });
            }}
            color="primary"
          >
            {lang.delete.cancel}
          </Button>
          <Button
            disabled={loading}
            onClick={this.deleteClick}
            color="primary"
            autoFocus
          >
            {loading ? (
              <CircularProgress size={20} />
            ) : (
              <React.Fragment>{lang.delete.confirm}</React.Fragment>
            )}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

Delete.propTypes = {
  lang: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setCustomState: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

export default Delete;
