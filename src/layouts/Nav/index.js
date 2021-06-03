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
            <div className="logo">
              <img src="/icon.png" alt="AudreyEnjoys Profile" />
              <h1>AudreyEnjoys</h1>
            </div>
            <div className="links">
              <Link to="/">{recipesText}</Link>
            </div>
          </div>
          <div className="social-links">
            <a href={SocialMediaLinks.youtube}>
              <i class="fab fa-youtube" aria-hidden="true"></i>
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
