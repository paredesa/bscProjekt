import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Body from "../components/Body";
import { Button } from "@material-ui/core";
import "./Home.less";

export default class Home extends Component {
  render() {
    const { lang } = this.props;
    return (
      <div>
        <Body>
          <div>
            <React.Fragment>
              <p className="home__content">
                {lang.home.title} <br />
              </p>
              <Link to="/notes">
                <Button variant="outlined">{lang.home.button}</Button>
              </Link>
            </React.Fragment>
          </div>
        </Body>
      </div>
    );
  }
}

Home.propTypes = {
  lang: PropTypes.object.isRequired
};
