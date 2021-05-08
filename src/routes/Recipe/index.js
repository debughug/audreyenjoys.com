import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";

import InstagramLink from "./InstagramLink";
import RecipeMetaInfo from "./RecipeMetaInfo";
import RecipeNotes from "./RecipeNotes";

const AutoplaySlider = withAutoplay(AwesomeSlider);

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
