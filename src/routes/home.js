import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

let Home = ({ recipes }) => {
  return (
    <div className="route route-home">
      <div className="recipes">
        {recipes.map((recipe, index) => (
          <Link
            key={index}
            to={`/recipe/${recipe.route}`}
            className="recipe"
            style={{ backgroundColor: recipe.inlineColor }}
          >
            <div
              className="food-image"
              style={{ backgroundImage: `url(${recipe.recipeImageURL}` }}
            ></div>
            <div className="food-name-wrapper">
              <h4 className="food-name">{recipe.recipeName}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
