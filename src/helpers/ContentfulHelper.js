export default class ContentfulHelper {
  constructor(assets = [], recipes = []) {
    this.assets = assets;
    this.recipes = recipes;
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
    let url = '';

    for (let i = 0; i < assets.length && isSearching; i++) {
      let assetId = assets[i].sys.id;

      if (assetId === id) {
        isSearching = false;
        url = `${assets[i].fields.file.url}?w=650`;
      }
    }

    return url;
  }

  getRecipes() {
    let recipes = [];

    this.recipes.forEach(recipe => {
      let hasSubImages = typeof recipe.fields.subImages === 'object';
      let fields = recipe.fields;
      let inlineRed = fields.redColorCode;
      let inlineGreen = fields.greenColorCode;
      let inlineBlue = fields.blueColorCode;
      let inlineColor = `rgb(${fields.redColorCode}, ${fields.greenColorCode}, ${fields.blueColorCode})`;
      let recipeName = fields.name;
      let route = recipeName
        .toLowerCase()
        .trim()
        .replace(/[\W_]+/g, ' ')
        .replace(/ /g, '-');
      let recipeImageURL = this.getAssetById(fields.mainImage.sys.id);
      let recipeSliderURLS = hasSubImages
        ? recipe.fields.subImages.map(recipeSubImage => this.getAssetById(recipeSubImage.sys.id))
        : [];
      let recipeVideoShareLink = fields.instagramShareLink;
      let recipeIngredients = fields.ingredients;
      let recipeInstructions = fields.instructions;
      let preparationTime = fields.preparationTime || null;
      let cookTime = fields.cookTime || null;
      let servingSize = fields.servingSize || null;
      let difficulty = fields.difficulty || null;
      let allRecipeImagesURLS = [recipeImageURL].concat(recipeSliderURLS);
      let metaInfo = [];

      if (preparationTime != null) {
        metaInfo.push({
          label: 'Preparation Time',
          value: `${preparationTime} min`,
        });
      }

      if (cookTime != null) {
        metaInfo.push({
          label: 'Cook Time',
          value: `${cookTime} min`,
        });
      }

      if (servingSize != null) {
        metaInfo.push({
          label: 'Serving Size',
          value: `${servingSize} friends`,
        });
      }

      let getDifficultyValue = difficulty => {
        let value = '';

        for (let i = 0; i < difficulty; i++) {
          value += '👩‍🍳';
        }

        return value;
      };

      if (difficulty != null) {
        metaInfo.push({
          label: 'Difficulty',
          value: getDifficultyValue(difficulty),
        });
      }

      recipes.push({
        inlineRed,
        inlineGreen,
        inlineBlue,
        inlineColor,
        recipeName,
        route,
        recipeImageURL,
        recipeSliderURLS,
        allRecipeImagesURLS,
        recipeVideoShareLink,
        recipeIngredients,
        recipeInstructions,
        metaInfo,
      });
    });

    return recipes;
  }
}
