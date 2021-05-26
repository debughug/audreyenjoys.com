import UITranslations from "./UITranslations";

export default class ContentfulHelper {
  constructor(translationCode = "en") {
    this.assets = [];
    this.recipes = [];
    this.translationCode = translationCode;
  }

  buildRecipeObject(recipe) {
    let dayText = UITranslations[this.translationCode].day;
    let daysText = UITranslations[this.translationCode].days;
    let hourText = UITranslations[this.translationCode].hour;
    let hoursText = UITranslations[this.translationCode].hours;
    let minuteText = UITranslations[this.translationCode].minute;
    let minutesText = UITranslations[this.translationCode].minutes;
    let prepTimeText = UITranslations[this.translationCode]["Preparation Time"];
    let cookTimText = UITranslations[this.translationCode]["Cook Time"];
    let servingSizeText = UITranslations[this.translationCode]["Serving Size"];
    let friendsText = UITranslations[this.translationCode].Friends;
    let difficultyText = UITranslations[this.translationCode].Difficulty;

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

      var dDisplay =
        d > 0 ? d + (d === 1 ? ` ${dayText}, ` : ` ${daysText} `) : "";
      var hDisplay =
        h > 0 ? h + (h === 1 ? ` ${hourText}, ` : ` ${hoursText} `) : "";
      var mDisplay =
        m > 0 ? m + (m === 1 ? ` ${minuteText}, ` : ` ${minutesText} `) : "";
      return dDisplay + hDisplay + mDisplay;
    };

    let createdAt = recipe.sys.createdAt;
    let inlineColor = `rgb(${recipe.fields.redColorCode}, ${recipe.fields.greenColorCode}, ${recipe.fields.blueColorCode})`;
    let recipeName = recipe.fields.name.trim();
    let pageName = recipe.fields.pageName || "";
    let route = pageName.toLowerCase().replace(/[\W_]+/g, "-");
    let recipeImageURL = this.getAssetById(recipe.fields.mainImage.sys.id);
    let recipeSliderURLS =
      typeof recipe.fields.subImages === "object"
        ? recipe.fields.subImages.map((recipeSubImage) =>
            this.getAssetById(recipeSubImage.sys.id)
          )
        : [];
    let allRecipeImagesURLS = [recipeImageURL].concat(recipeSliderURLS);
    let recipeVideoShareLink = recipe.fields.instagramShareLink || null;
    let recipeYouTubeVideo = recipe.fields.youTubeVideoId || null;
    let recipeIngredients = recipe.fields.ingredients;
    let recipeInstructions = recipe.fields.instructions;
    let preparationTime = recipe.fields.preparationTime || null;
    let cookTime = recipe.fields.cookTime || null;
    let servingSize = recipe.fields.servingSize || null;
    let difficulty = recipe.fields.difficulty || null;
    let notes = recipe.fields.notes || null;
    let metaInfo = [
      {
        label: prepTimeText,
        displayValue: convertMinutestoDays(preparationTime),
        isValid: preparationTime != null,
      },
      {
        label: cookTimText,
        displayValue: convertMinutestoDays(cookTime),
        isValid: cookTime != null,
      },
      {
        label: servingSizeText,
        displayValue: `${servingSize} ${friendsText}`,
        isValid: servingSize != null,
      },
      {
        label: difficultyText,
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
      recipeYouTubeVideo,
      recipeIngredients,
      recipeInstructions,
      notes,
    };
  }

  setTranslationCode(translationCode) {
    this.translationCode = translationCode;
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
