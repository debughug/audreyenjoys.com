import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import SocialMediaLinks from "../../configs/SocialMediaLinks";

class Home extends React.Component {
  render() {
    let translationCode = this.props.translationCode;
    let recipesText = window.UITranslations[translationCode].Recipes;
    let linksText = window.UITranslations[translationCode].Links;

    return (
      <div className="top-nav">
        <div className="container">
          <div className="nav">
            <Link to="/">
              <div className="logo">
                <img src="/icon.png" alt="AudreyEnjoys Profile" />
                <h1>AudreyEnjoys</h1>
              </div>
            </Link>
            <div className="links">
              <Link to="/">{recipesText}</Link>
              <Link to="/links">{linksText}</Link>
            </div>
          </div>
          <div className="social-links">
            <a href={SocialMediaLinks.instagram}>
              <i className="fab fa-instagram" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
