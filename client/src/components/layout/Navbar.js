import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav>
        <Link to="/">I am a Nav Bar</Link>
      </nav>
    );
  }
}

export default Navbar;
