import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import React from "react";

const AutoplaySlider = withAutoplay(AwesomeSlider);

let InstagramLink = ({ instagramVideoLink }) => {
  let element = null;

  if (instagramVideoLink) {
    element = (
      <a href={instagramVideoLink} target="_blank" rel="noopener noreferrer">
        <i className="fab fa-instagram"></i>
      </a>
    );
  }

  return element;
};

let WistiaLink = ({ wistiaID }) => {
  let element = null;

  if (wistiaID) {
    element = (
      <span
        class={`wistia_embed wistia_async_${wistiaID} popover=true popoverContent=link`}
      >
        <a href="#">Watch Now</a>
      </span>
    );
  }

  return element;
};

let RecipeMetaInfo = ({ metaInfo }) => {
  let element = null;

  if (metaInfo) {
    element = (
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
  }

  return element;
};

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

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    let checkedIngredients = [];

    for (let x = 0; x < this.props.recipe.recipeInstructions.length; x++) {
      checkedIngredients.push(false);
    }

    let checkedInstructions = [];

    for (let x = 0; x < this.props.recipe.recipeInstructions.length; x++) {
      checkedInstructions.push(false);
    }

    this.state = {
      recipe: this.props.recipe,
      checkedIngredients,
      checkedInstructions,
    };

    this.toggleIngredientsCheckClass = this.toggleIngredientsCheckClass.bind(
      this
    );

    this.toggleInstructionsCheckClass = this.toggleInstructionsCheckClass.bind(
      this
    );
  }

  toggleIngredientsCheckClass(index) {
    let checkedIngredients = this.state.checkedIngredients;
    checkedIngredients[index] = !checkedIngredients[index];
    this.setState({ checkedIngredients });
  }

  toggleInstructionsCheckClass(index) {
    let checkedInstructions = this.state.checkedInstructions;
    checkedInstructions[index] = !checkedInstructions[index];
    this.setState({ checkedInstructions });
  }

  render() {
    let recipe = this.state.recipe;

    return (
      <div
        className="route route-recipe"
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
                <WistiaLink wistiaID={"g2jf4rudy0"}></WistiaLink>
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
          <RecipeMetaInfo metaInfo={recipe.metaInfo}></RecipeMetaInfo>
          <div className="body">
            <div className="ingredients">
              <h3>Ingredients</h3>
              <ul className="ingredients-list cursor">
                {recipe.recipeIngredients.map((entry, index) => (
                  <li
                    className={
                      this.state.checkedIngredients[index]
                        ? "strikethrough"
                        : ""
                    }
                    onClick={() => this.toggleIngredientsCheckClass(index)}
                    key={index}
                  >
                    {entry}
                  </li>
                ))}
              </ul>
            </div>
            <div className="instructions">
              <h3>Instructions</h3>
              <ol className="instructions-list cursor">
                {recipe.recipeInstructions.map((entry, index) => (
                  <li
                    className={
                      this.state.checkedInstructions[index]
                        ? "strikethrough"
                        : ""
                    }
                    onClick={() => this.toggleInstructionsCheckClass(index)}
                    key={index}
                  >
                    {entry}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <RecipeNotes notesRichText={recipe.notes}></RecipeNotes>
        </div>
      </div>
    );
  }
}

export default Recipe;
