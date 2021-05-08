import React from "react";

let InstagramLink = ({ instagramVideoLink }) => {
  return (
    <a href={instagramVideoLink} target="_blank" rel="noopener noreferrer">
      <i className="fab fa-instagram"></i>
      <div>Watch on Instagram</div>
    </a>
  );
};

export default InstagramLink;
