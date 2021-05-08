import React from "react";

let RecipeMetaInfo = ({ metaInfo }) => {
  return (
    <div className="metas">
      <h2>Overview</h2>
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
