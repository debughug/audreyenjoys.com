import React from "react";

let InstagramLink = ({ instagramVideoLink }) => {
  let element = null;

  if (instagramVideoLink) {
    element = (
      <a href={instagramVideoLink} target="_blank" rel="noopener noreferrer">
        <i className="fab fa-instagram"></i>
        <div>Watch on Instagram</div>
      </a>
    );
  }

  return element;
};

export default InstagramLink;
