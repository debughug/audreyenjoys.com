import React from "react";
import T from "i18n-react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

let RecipeNotes = ({ notesRichText }) => {
  let element = null;

  if (notesRichText) {
    element = (
      <div className="notes">
        <h4>{T.translate("Notes")}</h4>
        {documentToReactComponents(notesRichText)}
      </div>
    );
  }

  return element;
};

export default RecipeNotes;
