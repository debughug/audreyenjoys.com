import React from "react";
import RecipeCard from "./RecipeCard";

let Home = ({ recipes }) => {
  return (
    <div className="route route-home">
      <div className="recipes">
        {recipes.map((recipe, index) => (
          <RecipeCard recipe={recipe} index={index}></RecipeCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
