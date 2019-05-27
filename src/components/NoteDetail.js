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
        console.log(json);
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
    const { note, loading } = this.state;
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
            {this.state.dialogOpen && (
              <Edit
                open={this.state.dialogOpen}
                edit={true}
                note={this.state.note}
                lang={this.props.lang}
                setCustomState={this.setCustomState}
              />
            )}

            {this.state.deleteDialog && (
              <Delete
                open={this.state.deleteDialog}
                id={this.state.note.id}
                deleteMethod={this.deleteMethod}
                lang={this.props.lang}
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
  lang: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default NoteDetail;
