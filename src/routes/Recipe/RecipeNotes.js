import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

let RecipeNotes = ({ notesRichText }) => {
  let element = null;

  if (notesRichText) {
    element = (
      <div className="notes">
        <h4>Notes</h4>
        {documentToReactComponents(notesRichText)}
      </div>
    );
  }

  return element;
};

export default RecipeNotes;
