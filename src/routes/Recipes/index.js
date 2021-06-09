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
    let recipes = this.props.recipes;

    return (
      <div className="route route-home">
        <div className="recipes">
          {recipes.map((recipe, index) => (
            <RecipeCard recipe={recipe} index={index} key={index} isHidden={false}></RecipeCard>
          ))}
        </div>
      </div>
    );
  }
}

export default Recipe;
