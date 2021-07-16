import React from "react";
import RecipeCard from "./RecipeCard";

class Recipe extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    let recipes = this.props.recipes || [];
    let recipeCards = recipes.map((recipe, index) => (
      <RecipeCard recipe={recipe} index={index} key={index} isHidden={false}></RecipeCard>
    ));

    return (
      <div className="route route-recipes">
        <div className="card-deck">{recipeCards}</div>
      </div>
    );
  }
}

export default Recipe;
