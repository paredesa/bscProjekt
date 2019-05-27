import React, { Component } from "react";
import PropTypes from "prop-types";
import Body from "../components/Body";

export default class Home extends Component {
  render() {
    const { lang } = this.props;
    return (
      <div>
        <Body>
          <div>
            {lang === "CZ" && <React.Fragment>Hlavní stránka</React.Fragment>}
            {lang === "EN" && <React.Fragment>Main Page</React.Fragment>}
          </div>
        </Body>
      </div>
    );
  }
}

Home.propTypes = {
  lang: PropTypes.string.isRequired
};
