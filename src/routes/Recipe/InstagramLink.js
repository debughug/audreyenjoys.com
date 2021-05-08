import React from "react";

let InstagramLink = ({ instagramVideoLink }) => {
  return (
    <a href={instagramVideoLink} target="_blank" rel="noopener noreferrer">
      <i className="fab fa-instagram"></i>
    </a>
  );
};

export default InstagramLink;
