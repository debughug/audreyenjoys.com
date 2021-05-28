import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

let RecipeCard = ({ recipe, index, isHidden }) => {
  let element = null;

  if (!isHidden) {
    element = (
      <Link
        key={index}
        to={`/recipe/${recipe.route}`}
        className="recipe"
        style={{ backgroundColor: recipe.inlineColor }}
      >
        <div className="food-image" style={{ backgroundImage: `url(${recipe.recipeImageURL}` }}></div>
        <div className="food-name-wrapper">
          <h4 className="food-name">{recipe.recipeName}</h4>
        </div>
      </Link>
    );
  }

  return element;
};

export default RecipeCard;
