import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

let Home = ({ recipes }) => {
  window.gtag('config', 'G-4BKRKLRH6D', {
    page_title: 'Home',
    page_location: window.location.href,
    page_path: window.location.pathname,
    send_page_view: true,
  });

  return (
    <div className="route-home">
      <div className="recipes">
        {recipes.map(recipe => {
          let linkTo = `/recipe/${recipe.route}`;
          return (
            <Link to={linkTo} className="recipe" style={{ backgroundColor: recipe.inlineColor }}>
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
