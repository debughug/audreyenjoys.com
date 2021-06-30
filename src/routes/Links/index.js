import React from "react";
import SocialMediaLinks from "../../configs/SocialMediaLinks";

let Links = () => {
  return (
    <div className="route route-links">
      <div className="links">
        <a className="link" href={SocialMediaLinks.twitch}>
          <i class="fab fa-twitch"></i>
        </a>
        <a className="link" href={SocialMediaLinks.instagram}>
          <i class="fab fa-instagram"></i>
        </a>
        <a className="link" href={SocialMediaLinks.youtube}>
          <i class="fab fa-youtube"></i>
        </a>
        <a className="link" href={SocialMediaLinks.tiktok}>
          <i class="fab fa-tiktok"></i>
        </a>
        <a className="link" href={SocialMediaLinks.email}>
          <i class="far fa-envelope"></i>
        </a>
      </div>
    </div>
  );
};

export default Links;
