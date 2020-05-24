import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Redirect Class
class redirect extends Component {
  // Render Function
  render() {
    return <Redirect to='/' />
  }
}
export default redirect;
