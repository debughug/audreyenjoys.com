import React from 'react';
import ConfigRecipes from '../configs/recipes';

class Recipe extends React.Component {
  componentDidMount() {
    let foodURLName = this.props.match.params.id;
    let currentFood = ConfigRecipes.filter(food => food.route == foodURLName)[0];
    window.scrollTo(0, 0);
    window.gtag('config', 'G-4BKRKLRH6D', {
      page_title: `${currentFood.recipeName}`,
      page_location: window.location.href,
      page_path: `/recipe/${currentFood.route}`,
      send_page_view: true,
    });
  }

  render() {
    let foodURLName = this.props.match.params.id;
    let currentFood = ConfigRecipes.filter(food => food.route == foodURLName)[0];
    let instagramVideoLink = currentFood.recipeVideoShareLink;

    return (
      <div className={`Viewer trasition-base`} style={{ backgroundColor: currentFood.inlineColor }}>
        <div className="content">
          <div className="intro">
            <div className="food-intro">
              <h6 className="food-brand">AudreyEnjoys</h6>
              <h1 className="food-name">{currentFood.recipeName}</h1>
              <div className="social-links">
                {instagramVideoLink && (
                  <a href={instagramVideoLink}>
                    <i className="fab fa-instagram"></i>
                    <span className="instagram-label">Watch on Instagram</span>
                  </a>
                )}
              </div>
            </div>
            <div className="food-image" style={{ backgroundImage: `url(${currentFood.recipeImageURL}` }}></div>
          </div>
          <div className="body">
            <div className="ingredients">
              <h4>Ingredients</h4>
              {currentFood.recipeIngredients.map(list => (
                <>
                  {list.listName && <h5>{list.listName}</h5>}
                  <ul className="ingredients-list">
                    {list.list.map(entry => (
                      <li>{entry}</li>
                    ))}
                  </ul>
                </>
              ))}
            </div>
            <div className="instructions">
              <h4>Instructions</h4>
              {currentFood.recipeInstructions.map(list => (
                <>
                  {list.listName && <h5>{list.listName}</h5>}
                  <ul className="ingredients-list">
                    {list.list.map(entry => (
                      <li>{entry}</li>
                    ))}
                  </ul>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Recipe;
