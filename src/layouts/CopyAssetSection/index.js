import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

let CopyAssetSection = ({ assetUrl, paragraphs, isCentered, mainCTA }) => {
  let sectionClass = "copy-asset-section";
  sectionClass = isCentered ? sectionClass + " centered" : null;

  return (
    <section class={sectionClass}>
      <div className="copy-half">
        {paragraphs.map((paragraph) => (
          <p>{paragraph}</p>
        ))}
        {mainCTA && <Link to={mainCTA}>Go to Recipes</Link>}
      </div>
      <div class="asset-half">
        <img class="img-responsive rounded-light shadow-light" src={assetUrl}></img>
      </div>
    </section>
  );
};

export default CopyAssetSection;
