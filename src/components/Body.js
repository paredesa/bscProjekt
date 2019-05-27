import React, { Component } from "react";
import "./Body.less";

class Body extends Component {
  render() {
    return (
      <div className="body__wrapper">
        <div className="body__wrapper__grid">{this.props.children}</div>
      </div>
    );
  }
}

export default Body;
