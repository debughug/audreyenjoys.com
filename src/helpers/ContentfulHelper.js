export default class ContentfulHelper {
  constructor(assets = [], recipes = []) {
    this.assets = assets;
    this.recipes = recipes;
  }

  buildRecipeObject(recipe) {
    let getDifficultyValue = (difficulty) => {
      let value = "";

      for (let i = 0; i < difficulty; i++) {
        value += "👩‍🍳";
      }

      return value;
    };

    let inlineColor = `rgb(${recipe.fields.redColorCode}, ${recipe.fields.greenColorCode}, ${recipe.fields.blueColorCode})`;
    let recipeName = recipe.fields.name.trim();
    let route = recipeName.toLowerCase().replace(/[\W_]+/g, "-");

    let recipeImageURL = this.getAssetById(recipe.fields.mainImage.sys.id);
    let recipeSliderURLS =
      typeof recipe.fields.subImages === "object"
        ? recipe.fields.subImages.map((recipeSubImage) =>
            this.getAssetById(recipeSubImage.sys.id)
          )
        : [];
    let allRecipeImagesURLS = [recipeImageURL].concat(recipeSliderURLS);
    let recipeVideoShareLink = recipe.fields.instagramShareLink;
    let recipeIngredients = recipe.fields.ingredients;
    let recipeInstructions = recipe.fields.instructions;
    let preparationTime = recipe.fields.preparationTime || null;
    let cookTime = recipe.fields.cookTime || null;
    let servingSize = recipe.fields.servingSize || null;
    let difficulty = recipe.fields.difficulty || null;
    let metaInfo = [
      {
        label: "Preparation Time",
        displayValue: `${preparationTime} min`,
        isValid: preparationTime != null,
      },
      {
        label: "Cook Time",
        displayValue: `${cookTime} min`,
        isValid: cookTime != null,
      },
      {
        label: "Serving Size",
        displayValue: `${servingSize} friends`,
        isValid: servingSize != null,
      },
      {
        label: "Difficulty",
        displayValue: getDifficultyValue(difficulty),
        isValid: difficulty != null,
      },
    ];

    return {
      route,
      recipeName,
      inlineColor,
      metaInfo,
      recipeImageURL,
      allRecipeImagesURLS,
      recipeVideoShareLink,
      recipeIngredients,
      recipeInstructions,
    };
  }

  setAssets(assets = []) {
    this.assets = assets;
  }

  setRecipes(recipes = []) {
    this.recipes = recipes;
  }

  getAssetById(id) {
    let assets = this.assets;
    let isSearching = true;
    let url = "";

    for (let i = 0; i < assets.length && isSearching; i++) {
      let assetId = assets[i].sys.id;

      if (assetId === id) {
        isSearching = false;
        url = `${assets[i].fields.file.url}?w=750`;
      }
    }

    return url;
  }

  getRecipes() {
    let recipes = [];

    this.recipes.forEach((recipe) => {
      recipes.push(this.buildRecipeObject(recipe));
    });

    return recipes;
  }
}
