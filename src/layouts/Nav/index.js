import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import T from "i18n-react";

import SocialMediaLinks from "../../configs/SocialMediaLinks";

class Home extends React.Component {
  render() {
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
              <Link to="/">
                <T.span text="Recipes"></T.span>
              </Link>
              <Link to="/links">
                <T.span text="Links"></T.span>
              </Link>
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
