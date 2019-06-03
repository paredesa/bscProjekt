import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  Card,
  Divider,
  CardContent,
  CircularProgress,
  CardActions,
  IconButton,
  CardActionArea
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Delete from "./Delete";
import Edit from "./Edit";
import "./NoteSingle.less";

class NoteSingle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: {},
      deleteDialog: false,
      dialogOpen: false
    };

    this.actionAreaClick = () => {
      this.props.history.push("/notes/" + this.state.note.id);
    };

    this.setCustomState = state => {
      this.setState(state);
    };
  }

  componentDidMount() {
    this.setState({ note: this.props.note });
  }

  render() {
    const { note, dialogOpen, deleteDialog } = this.state;
    const { loading, lang, deleteMethod } = this.props;
    return (
      <Grid className="noteSingle__grid" item>
        <Card elevation={3} className="noteSingle__grid__paper">
          {loading ? (
            <CardContent className="noteSingle__grid__paper__loading">
              <CircularProgress />
            </CardContent>
          ) : (
            <React.Fragment>
              <CardActionArea
                onClick={this.actionAreaClick}
                className="noteSingle__grid__paper__actionArea"
              >
                <CardContent className="noteSingle__grid__paper__actionArea__content">
                  <Typography
                    className="noteSingle__grid__paper__actionArea__content__title"
                    variant="h6"
                  >
                    {note.title}
                  </Typography>
                  <Divider />
                  <div className="noteSingle__grid__paper__actionArea__content__body">
                    {note.body}
                  </div>
                  <div />
                </CardContent>
              </CardActionArea>
              <CardActions className="noteSingle__grid__paper__actions">
                <IconButton onClick={() => this.setState({ dialogOpen: true })}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => this.setState({ deleteDialog: true })}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
              {dialogOpen && (
                <Edit
                  lang={lang}
                  open={dialogOpen}
                  note={note}
                  edit={true}
                  setCustomState={this.setCustomState}
                />
              )}
              {deleteDialog && (
                <Delete
                  lang={lang}
                  open={deleteDialog}
                  id={note.id}
                  deleteMethod={deleteMethod}
                  setCustomState={this.setCustomState}
                />
              )}
            </React.Fragment>
          )}
        </Card>
      </Grid>
    );
  }
}

NoteSingle.propTypes = {
  lang: PropTypes.object.isRequired,
  history: PropTypes.object,
  deleteMethod: PropTypes.func,
  note: PropTypes.object,
  loading: PropTypes.bool
};

export default NoteSingle;
