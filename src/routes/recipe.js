import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import React from "react";

const AutoplaySlider = withAutoplay(AwesomeSlider);

let InstagramLink = ({ instagramVideoLink }) => {
  let element = null;

  if (instagramVideoLink) {
    element = (
      <a href={instagramVideoLink} target="_blank">
        <i className="fab fa-instagram"></i>
        <span className="instagram-label">Watch on Instagram</span><i class="fas fa-external-link-alt"></i>
      </a>
    );
  }

  return element;
};

let Recipe = ({ recipe }) => {
  window.scrollTo(0, 0);

  return (
    <div
      className={`route-recipe`}
      style={{ backgroundColor: recipe.inlineColor }}
    >
      <div className="content">
        <div className="intro">
          <div className="food-intro">
            <h6>AudreyEnjoys</h6>
            <h1>{recipe.recipeName}</h1>
            <div className="social-links">
              <InstagramLink
                instagramVideoLink={recipe.recipeVideoShareLink}
              ></InstagramLink>
            </div>
          </div>
          <AutoplaySlider
            infinite={recipe.allRecipeImagesURLS.length > 0}
            bullets={false}
            play={true}
            interval={3210}
          >
            {recipe.allRecipeImagesURLS.map((url, index) => (
              <div key={index} data-src={url} />
            ))}
          </AutoplaySlider>
        </div>
        {recipe.metaInfo.length && (
          <div className="metas">
            <h4>Overview</h4>
            {recipe.metaInfo.map((data, index) => (
              <div className="meta" key={index}>
                <span className="key">{data.label}:</span>
                <span className="value">{data.displayValue}</span>
              </div>
            ))}
          </div>
        )}
        <div className="body">
          <div className="ingredients">
            <h4>Ingredients</h4>
            <ul className="ingredients-list">
              {recipe.recipeIngredients.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          </div>
          <div className="instructions">
            <h4>Instructions</h4>
            <ol className="instructions-list">
              {recipe.recipeInstructions.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ol>
          </div>
        </div>
        {recipe.notes && (
          <div className="notes">
            <h4>Notes</h4>
            {documentToReactComponents(recipe.notes)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipe;
