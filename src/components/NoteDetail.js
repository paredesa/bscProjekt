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
import "./NoteDetail.less";
import Edit from "./Edit";
class NoteDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: {},
      loading: false,
      dialogOpen: false
    };

    this.fetchNote = async () => {
      this.setState({ loading: true });

      const response = await fetch(
        "http://jsonplaceholder.typicode.com/posts/" +
          this.props.match.params.id
      );
      const json = await response.json();

      this.setState({ note: json, loading: false });
      console.log(json);
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
              <IconButton
                onClick={() => this.setCustomState({ dialogOpen: true })}
              >
                <EditIcon />
              </IconButton>
            </CardActions>
            <Edit
              open={this.state.dialogOpen}
              edit={true}
              note={this.state.note}
              setCustomState={this.setCustomState}
            />
          </React.Fragment>
        )}
      </Card>
    );
  }
}

NoteDetail.propTypes = {
  match: PropTypes.object.isRequired
};

export default NoteDetail;
