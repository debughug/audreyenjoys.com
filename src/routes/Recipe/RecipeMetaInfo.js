import React from "react";
import T from "i18n-react";

let RecipeMetaInfo = ({ metaInfo }) => (
  <div className="metas">
    <h2>{T.translate("Overview")}</h2>
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

export default RecipeMetaInfo;
