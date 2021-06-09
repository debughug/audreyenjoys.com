import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import UITranslations from "../../configs/UITranslations";
import SocialMediaLinks from "../../configs/SocialMediaLinks";

class Home extends React.Component {
  render() {
    let translationCode = this.props.translationCode;
    let recipesText = UITranslations[translationCode].Recipes;

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
              <Link to="/recipes">{recipesText}</Link>
            </div>
          </div>
          <div className="social-links">
            <a href={SocialMediaLinks.tiktok}>
              <i className="fab fa-tiktok" aria-hidden="true"></i>
            </a>
            <a href={SocialMediaLinks.youtube}>
              <i className="fab fa-youtube" aria-hidden="true"></i>
            </a>
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
