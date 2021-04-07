import './styles/index.scss';

import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

import Home from './routes/home';
import Recipe from './routes/recipe';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    };
  }

  componentDidMount() {
    let _this = this;
    let recipes = [];

    axios.get(`https://audreyenjoys.s3-us-west-2.amazonaws.com/recipes.json`).then(function (response) {
      let items = response.data.items;
      let findAssetById = id => {
        let assets = response.data.includes.Asset;
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
      };

      items.forEach(recipe => {
        let hasSubImages = typeof recipe.fields.subImages === 'object';
        let fields = recipe.fields;
        let inlineColor = `rgb(${fields.redColorCode}, ${fields.greenColorCode}, ${fields.blueColorCode})`;
        let recipeName = fields.name;
        let route = recipeName
          .toLowerCase()
          .trim()
          .replace(/[\W_]+/g, ' ')
          .replace(/ /g, '-');
        let recipeImageURL = findAssetById(fields.mainImage.sys.id);
        let recipeSliderURLS = hasSubImages
          ? recipe.fields.subImages.map(recipeSubImage => findAssetById(recipeSubImage.sys.id))
          : [];
        let recipeVideoShareLink = fields.instagramShareLink;
        let recipeIngredients = fields.ingredients;
        let recipeInstructions = fields.instructions;

        recipes.push({
          inlineColor,
          recipeName,
          route,
          recipeImageURL,
          recipeSliderURLS,
          recipeVideoShareLink,
          recipeIngredients,
          recipeInstructions,
        });
      });

      _this.setState({
        recipes,
      });
    });
  }

  render() {
    return (
      <Router>
        <div className="top-nav">
          <div className="nav">
            <div className="logo">
              <img
                src="https://audreyenjoys.s3-us-west-2.amazonaws.com/logo-icon.jpg"
                alt="AudreyEnjoys Profile Picture"
              ></img>
            </div>
            <h1>AudreyEnjoys</h1>
            <div className="links">
              <Link to="/">Recipes</Link>
            </div>
          </div>
          <div className="social-links">
            <a href="mailto:me@audreyenjoys.com" className="email-link">
              <i className="far fa-envelope"></i>
            </a>
            <a href="https://www.instagram.com/audreyenjoys/">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <Switch>
          <Route path="/" exact component={Home}>
            <Home recipes={this.state.recipes} />
          </Route>
          {this.state.recipes.map(recipe => (
            <Route path={`/recipe/${recipe.route}`} exact render={() => <Recipe recipe={recipe}></Recipe>}></Route>
          ))}
        </Switch>
      </Router>
    );
  }
}
