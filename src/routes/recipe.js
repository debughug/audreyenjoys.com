import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Popover } from "react-tiny-popover";
import React from "react";

const AutoplaySlider = withAutoplay(AwesomeSlider);

let InstagramLink = ({ instagramVideoLink }) => {
  let element = null;

  if (instagramVideoLink) {
    element = (
      <a href={instagramVideoLink} target="_blank" rel="noopener noreferrer">
        <i className="fab fa-instagram"></i>
        <span className="instagram-label">Watch on Instagram</span>
        <i className="fas fa-external-link-alt"></i>
      </a>
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
      isPrintPopover: false,
      checkedIngredients,
      checkedInstructions,
    };

    this.setIsPrintPopover = this.setIsPrintPopover.bind(this);

    this.toggleIngredientsCheckClass = this.toggleIngredientsCheckClass.bind(
      this
    );

    this.toggleInstructionsCheckClass = this.toggleInstructionsCheckClass.bind(
      this
    );
  }

  setIsPrintPopover(isPrintPopover) {
    this.setState({ isPrintPopover });
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

              <button className="print-page" onClick={() => window.print()}>
                Print! <i className="fas fa-print"></i>
              </button>
            </div>
          )}
          <div className="body">
            <div className="ingredients">
              <h4>Ingredients</h4>
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
              <h4>Instructions</h4>
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
          {recipe.notes && (
            <div className="notes">
              <h4>Notes</h4>
              {documentToReactComponents(recipe.notes)}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Recipe;
