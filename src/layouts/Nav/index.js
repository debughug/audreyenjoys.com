import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import UITranslations from "../../helpers/UITranslations";

class Home extends React.Component {
  render() {
    let translationCode = this.props.translationCode;
    let recipesText = UITranslations[translationCode].Recipes;

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
              <Link to="/">{recipesText}</Link>
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
