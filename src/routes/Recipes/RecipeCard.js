import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

let RecipeCard = ({ recipe, index, isHidden }) => {
  let element = null;

  if (!isHidden) {
    element = (
      <Link key={index} to={`/${recipe.route}`} className="card" style={{ borderColor: recipe.inlineColor }}>
        <div className="card-image" style={{ backgroundImage: `url(${recipe.recipeImageURL}` }}></div>
        <div className="card-content" style={{ border: `2px solid ${recipe.inlineColor}` }}>
          <h5 className="card-name">{recipe.recipeName}</h5>
        </div>
      </Link>
    );
  }

  return element;
};

export default RecipeCard;
