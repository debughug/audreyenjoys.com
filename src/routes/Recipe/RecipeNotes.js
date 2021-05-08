import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

let RecipeNotes = ({ notesRichText }) => {
  return (
    <div className="notes">
      <h4>Notes</h4>
      {documentToReactComponents(notesRichText)}
    </div>
  );
};

export default RecipeNotes;
