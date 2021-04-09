import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

let Home = ({ recipes }) => {
  return (
    <div className="route-home">
      <div className="recipes">
        {recipes.map((recipe, index) => {
          let linkTo = `/recipe/${recipe.route}`;
          return (
            <Link key={index} to={linkTo} className="recipe" style={{ backgroundColor: recipe.inlineColor }}>
              <div className="food-image" style={{ backgroundImage: `url(${recipe.recipeImageURL}` }}></div>
              <div className="food-name-wrapper">
                <h4 className="food-name">{recipe.recipeName}</h4>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
