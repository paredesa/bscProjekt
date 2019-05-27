import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions
} from "@material-ui/core";

class Delete extends Component {
  constructor(props) {
    super(props);

    this.deleteClick = async () => {
      try {
        await fetch(
          "http://jsonplaceholder.typicode.com/posts/" + this.props.id,
          {
            method: "DELETE"
          }
        );
        this.props.deleteMethod(this.props.id);
        this.props.setCustomState({ deleteDialog: false });
      } catch (error) {
        console.log(error);
      }
    };
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={() => {
          this.props.setCustomState({ deleteDialog: false });
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Smazání poznámky</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Opravdu chcete smazat tuto poznámku ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.props.setCustomState({ deleteDialog: false });
            }}
            color="primary"
          >
            Nesouhlasím
          </Button>
          <Button onClick={this.deleteClick} color="primary" autoFocus>
            Souhlasím
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

Delete.propTypes = {
  open: PropTypes.bool.isRequired,
  setCustomState: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

export default Delete;
