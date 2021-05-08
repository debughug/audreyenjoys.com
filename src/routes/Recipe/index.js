import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";

import InstagramLink from "./InstagramLink";
import RecipeMetaInfo from "./RecipeMetaInfo";
import RecipeNotes from "./RecipeNotes";
import UITranslations from "../../helpers/UITranslations";

const AutoplaySlider = withAutoplay(AwesomeSlider);

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    let checkedIngredients = [].fill(
      false,
      0,
      this.props.recipe.recipeIngredients.length
    );

    let checkedInstructions = [].fill(
      false,
      0,
      this.props.recipe.recipeInstructions.length
    );

    this.state = {
      recipe: this.props.recipe,
      checkedIngredients,
      checkedInstructions,
    };

    this.toggleIngredients = this.toggleIngredients.bind(this);

    this.toggleInstructions = this.toggleInstructions.bind(this);
  }

  toggleIngredients(index) {
    let checkedIngredients = this.state.checkedIngredients;
    checkedIngredients[index] = !checkedIngredients[index];
    this.setState({ checkedIngredients });
  }

  toggleInstructions(index) {
    let checkedInstructions = this.state.checkedInstructions;
    checkedInstructions[index] = !checkedInstructions[index];
    this.setState({ checkedInstructions });
  }

  render() {
    let recipe = this.props.recipe;
    let translationCode = this.props.translationCode;
    let ingredientsText = UITranslations[translationCode].Ingredients;
    let instructionsText = UITranslations[translationCode].Instructions;

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
            </div>
            <div className="language-picker">
              <button
                className={translationCode == "es" ? "visible" : "hidden"}
                onClick={() => this.props.setTranslationCode("en")}
              >
                Read in English&#63;
              </button>
              <button
                className={translationCode == "en" ? "visible" : "hidden"}
                onClick={() => this.props.setTranslationCode("es")}
              >
                &iquest;Leer en Español&#63;
              </button>
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
            <div className="social-links">
              <InstagramLink
                instagramVideoLink={recipe.recipeVideoShareLink}
              ></InstagramLink>
            </div>
          </div>
          <RecipeMetaInfo
            metaInfo={recipe.metaInfo}
            translationCode={translationCode}
          ></RecipeMetaInfo>
          <div className="body">
            <div className="ingredients">
              <h3>{ingredientsText}</h3>
              <ul className="ingredients-list cursor">
                {recipe.recipeIngredients.map((entry, index) => (
                  <li
                    className={
                      this.state.checkedIngredients[index]
                        ? "strikethrough"
                        : ""
                    }
                    onClick={() => this.toggleIngredients(index)}
                    key={index}
                  >
                    {entry}
                  </li>
                ))}
              </ul>
            </div>
            <div className="instructions">
              <h3>{instructionsText}</h3>
              <ol className="instructions-list cursor">
                {recipe.recipeInstructions.map((entry, index) => (
                  <li
                    className={
                      this.state.checkedInstructions[index]
                        ? "strikethrough"
                        : ""
                    }
                    onClick={() => this.toggleInstructions(index)}
                    key={index}
                  >
                    {entry}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <RecipeNotes
            notesRichText={recipe.notes}
            translationCode={translationCode}
          ></RecipeNotes>
        </div>
      </div>
    );
  }
}

export default Recipe;
