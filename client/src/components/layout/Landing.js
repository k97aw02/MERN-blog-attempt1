import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div>
        <h4>Welcome to Craft Space</h4>
        <p>Login or Register below</p>
        <br />
        <div>
          <Link
            to="/register"
            style={{
              width: "140px",
              borderRadius: "3px",
              letterSpacing: "1px",
            }}
          >
            Register
          </Link>
        </div>
        <div>
          <Link
            to="/login"
            style={{
              width: "140px",
              borderRadius: "3px",
              letterSpacing: "1px",
            }}
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }
}

export default Landing;
