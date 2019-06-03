import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Divider,
  CardActions,
  IconButton
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "./NoteDetail.less";
import Edit from "./Edit";
import Delete from "./Delete";
class NoteDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: {},
      loading: false,
      dialogOpen: false,
      deleteDialog: false
    };

    this.fetchNote = async () => {
      this.setState({ loading: true });
      try {
        const response = await fetch(
          "http://jsonplaceholder.typicode.com/posts/" +
            this.props.match.params.id
        );
        const json = await response.json();

        this.setState({ note: json, loading: false });

        if (!response.ok) this.props.history.push("/notes");
      } catch (error) {
        this.props.history.push("/notes");
      }
    };

    this.deleteMethod = () => {
      this.props.history.push("/notes");
    };

    this.setCustomState = state => {
      this.setState(state);
    };
  }

  componentDidMount() {
    this.fetchNote();
  }
  render() {
    const { lang } = this.props;
    const { note, loading, dialogOpen, deleteDialog } = this.state;
    return (
      <Card className="noteDetail">
        {loading ? (
          <CardContent className="noteDetail__content">
            <CircularProgress />
          </CardContent>
        ) : (
          <React.Fragment>
            <CardContent className="noteDetail__content">
              <Typography className="noteDetail__content__title" variant="h6">
                {note.title}
              </Typography>
              <Divider />
              <div className="noteDetail__content__body">{note.body}</div>
            </CardContent>
            <CardActions className="noteDetail__actions">
              <IconButton onClick={() => this.setState({ dialogOpen: true })}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => this.setState({ deleteDialog: true })}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
            {dialogOpen && (
              <Edit
                open={dialogOpen}
                edit={true}
                note={note}
                lang={lang}
                setCustomState={this.setCustomState}
              />
            )}

            {deleteDialog && (
              <Delete
                open={deleteDialog}
                id={note.id}
                deleteMethod={this.deleteMethod}
                lang={lang}
                setCustomState={this.setCustomState}
              />
            )}
          </React.Fragment>
        )}
      </Card>
    );
  }
}

NoteDetail.propTypes = {
  lang: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default NoteDetail;
