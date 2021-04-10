import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

let Home = ({ recipes }) => {
  return (
    <div className="top-nav">
      <div className="nav">
        <div className="logo">
          <img
            src="https://audreyenjoys.s3-us-west-2.amazonaws.com/logo-icon.jpg"
            alt="AudreyEnjoys Profile Picture"
          ></img>
        </div>
        <h1>AudreyEnjoys</h1>
        <div className="links">
          <Link to="/">Recipes</Link>
        </div>
      </div>
      <div className="social-links">
        <a href="mailto:me@audreyenjoys.com" className="email-link">
          <i className="far fa-envelope"></i>
        </a>
        <a href="https://www.instagram.com/audreyenjoys/">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  );
};

export default Home;
