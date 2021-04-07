import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import React from 'react';

const AutoplaySlider = withAutoplay(AwesomeSlider);
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
    let recipeSliderURLS = currentFood.recipeSliderURLS || [];
    let allRecipeImages = [currentFood.recipeImageURL].concat(recipeSliderURLS);
    let hasRecipeSlider = recipeSliderURLS.length > 0;

    let MainAsset = hasRecipeSlider ? (
      <AutoplaySlider className="food-asset carousel" bullets={false} play={true} interval={3210}>
        {allRecipeImages.map(url => (
          <div data-src={url} />
        ))}
      </AutoplaySlider>
    ) : (
      <div className="food-asset image" style={{ backgroundImage: `url(${currentFood.recipeImageURL})` }}></div>
    );

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
            {MainAsset}
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
