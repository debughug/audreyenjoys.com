import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div className="top-nav">
        <div className="container">
          <div className="nav">
            <div className="logo">
              <img
                src="https://audreyenjoys.s3-us-west-2.amazonaws.com/logo-icon.jpg"
                alt="AudreyEnjoys Profile"
              />
            </div>
            <h1>AudreyEnjoys</h1>
            <div className="links">
              <Link to="/">Recipes</Link>
            </div>
          </div>
          <div className="social-links">
            <a href="https://www.instagram.com/audreyenjoys/">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
