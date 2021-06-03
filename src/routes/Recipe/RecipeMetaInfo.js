import React from "react";
import UITranslations from "../../configs/UITranslations";

let RecipeMetaInfo = ({ metaInfo, translationCode = "en" }) => {
  let overviewText = UITranslations[translationCode].Overview;

  return (
    <div className="metas">
      <h2>{overviewText}</h2>
      {metaInfo.map((data, index) => {
        let element = null;
        let isValidMetaInfo = typeof data == "object" && data.isValid;

        if (isValidMetaInfo) {
          element = (
            <div className="meta" key={index}>
              <span className="key">{data.label}:</span>
              <span className="value">{data.displayValue}</span>
            </div>
          );
        }

        return element;
      })}
    </div>
  );
};

export default RecipeMetaInfo;
