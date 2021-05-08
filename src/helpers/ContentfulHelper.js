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

    let convertMinutestoDays = (minutes) => {
      let seconds = Number(minutes * 60);
      var d = Math.floor(seconds / (3600 * 24));
      var h = Math.floor((seconds % (3600 * 24)) / 3600);
      var m = Math.floor((seconds % 3600) / 60);
      var s = Math.floor(seconds % 60);

      var dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days ") : "";
      var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours ") : "";
      var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes ") : "";
      var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
      return dDisplay + hDisplay + mDisplay + sDisplay;
    };

    let createdAt = recipe.sys.createdAt;
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
    let notes = recipe.fields.notes || null;
    let metaInfo = [
      {
        label: "Preparation Time",
        displayValue: convertMinutestoDays(preparationTime),
        isValid: preparationTime != null,
      },
      {
        label: "Cook Time",
        displayValue: convertMinutestoDays(cookTime),
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
      createdAt,
      recipeName,
      inlineColor,
      metaInfo,
      recipeImageURL,
      allRecipeImagesURLS,
      recipeVideoShareLink,
      recipeIngredients,
      recipeInstructions,
      notes,
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

    recipes = recipes.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return recipes;
  }
}
