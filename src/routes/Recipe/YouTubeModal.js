import React from "react";
import ModalVideo from "react-modal-video";

let YouTubeModal = ({ youTubeVideoId, videoIsOpen, setVideoIsOpen }) => {
  let element = null;

  if (youTubeVideoId) {
    element = (
      <div>
        <a href="#youtube-video" onClick={() => setVideoIsOpen(true)}>
          <i className="fab fa-youtube"></i>
        </a>
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={videoIsOpen}
          videoId={youTubeVideoId}
          onClose={() => setVideoIsOpen(false)}
        />
        ,
      </div>
    );
  }

  return element;
};

export default YouTubeModal;
