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
        this.props.setCustomState({ deleteDialog: false });
        this.props.deleteMethod(this.props.id);
      } catch (error) {
        console.log(error);
      }
    };
  }

  render() {
    const { lang } = this.props;
    return (
      <Dialog
        open={this.props.open}
        onClose={() => {
          this.props.setCustomState({ deleteDialog: false });
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {lang === "CZ" && "Smazání poznámky"}
          {lang === "EN" && "Delete note"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {lang === "CZ" && "Opravdu chcete smazat tuto poznámku ?"}
            {lang === "EN" && "Do you really want to delete this note ?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.props.setCustomState({ deleteDialog: false });
            }}
            color="primary"
          >
            {lang === "CZ" && "Nesouhlasím"}
            {lang === "EN" && "Disagree"}
          </Button>
          <Button onClick={this.deleteClick} color="primary" autoFocus>
            {lang === "CZ" && "Souhlasím"}
            {lang === "EN" && "Agree"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

Delete.propTypes = {
  lang: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setCustomState: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

export default Delete;
