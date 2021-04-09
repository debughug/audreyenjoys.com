import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import React from "react";

const AutoplaySlider = withAutoplay(AwesomeSlider);

let Recipe = ({ recipe }) => {
  window.scrollTo(0, 0);
  let currentFood = recipe;
  let instagramVideoLink = currentFood.recipeVideoShareLink;
  let recipeSliderURLS = currentFood.recipeSliderURLS || [];
  let allRecipeImages = [currentFood.recipeImageURL].concat(recipeSliderURLS);
  let hasRecipeSlider = recipeSliderURLS.length > 0; 

  let MainAsset = hasRecipeSlider ? (
    <AutoplaySlider 
      className="food-asset carousel"
      bullets={false}
      play={true}
      interval={3210}
    >
      {allRecipeImages.map((url, index) => (
        <div key={index} data-src={url} />
      ))}
    </AutoplaySlider>
  ) : (
    <div
      className="food-asset image"
      style={{ backgroundImage: `url(${currentFood.recipeImageURL})` }}
    ></div>
  );

  return (
    <div
      className={`route-recipe`}
      style={{ backgroundColor: currentFood.inlineColor }}
    >
      <div className="content">
        <div className="intro">
          <div className="food-intro">
            <h6>AudreyEnjoys</h6>
            <h1>{currentFood.recipeName}</h1>
            <div className="social-links">
              {instagramVideoLink && (
                <a href={instagramVideoLink}>
                  <i className="fab fa-instagram"></i>
                  <span className="instagram-label">Watch on Instagram</span>
                </a>
              )}
            </div>
          </div>
          {MainAsset}
        </div>
        <div className="body">
          <div className="ingredients">
            <h4>Ingredients</h4>
            <ul className="ingredients-list">
              {currentFood.recipeIngredients.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          </div>
          <div className="instructions">
            <h4>Instructions</h4>
            <ol className="instructions-list">
              {currentFood.recipeInstructions.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
