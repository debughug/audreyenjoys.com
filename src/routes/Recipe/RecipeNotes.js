import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import UITranslations from "../../helpers/UITranslations";

let RecipeNotes = ({ notesRichText, translationCode = "en" }) => {
  let notesText = UITranslations[translationCode].Notes;
  let element = null;

  if (notesRichText) {
    element = (
      <div className="notes">
        <h4>{notesText}</h4>
        {documentToReactComponents(notesRichText)}
      </div>
    );
  }

  return element;
};

export default RecipeNotes;
