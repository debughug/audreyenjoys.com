import React from 'react';

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: props.recipe,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    let currentFood = this.state.recipe;
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
              <ul className="ingredients-list">
                <h4>Ingredients</h4>
                {currentFood.recipeIngredients.map(entry => (
                  <li>{entry}</li>
                ))}
              </ul>
            </div>
            <div className="instructions">
              <h4>Instructions</h4>
              {currentFood.recipeInstructions.map(entry => (
                <li>{entry}</li>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Recipe;
