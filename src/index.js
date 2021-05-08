import "./styles/index.scss";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import Nav from "./layouts/Nav";
import Footer from "./layouts/Footer";
import Home from "./routes/Home";
import Recipe from "./routes/Recipe";

import ContentfulHelper from "./helpers/ContentfulHelper";
import Endpoints from "./helpers/Endpoints";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      translationCode: "en",
      translatedRecipes: {},
    };

    this.setTranslationCode = this.setTranslationCode.bind(this);
  }

  setTranslationCode(translationCode = "") {
    if (translationCode) {
      this.setState({
        translationCode,
      });
    }
  }

  componentDidMount() {
    let _this = this;

    axios
      .all([axios.get(Endpoints.recipes.en), axios.get(Endpoints.recipes.es)])
      .then(
        axios.spread(function (enRes, esRes) {
          let Helper = new ContentfulHelper();
          let translatedRecipes = {};

          Helper.setAssets(enRes.data.includes.Asset);
          Helper.setRecipes(enRes.data.items);
          translatedRecipes.en = Helper.getRecipes();

          Helper.setAssets(esRes.data.includes.Asset);
          Helper.setRecipes(esRes.data.items);
          translatedRecipes.es = Helper.getRecipes();

          _this.setState({
            isLoading: false,
            translatedRecipes,
          });
        })
      );
  }

  render() {
    /* Add loading state my dude */
    let isLoading = this.state.isLoading;
    if (isLoading) {
      return <div></div>;
    }
    /* Add loading state my dude */

    let translationCode = this.state.translationCode;
    let translatedRecipes = this.state.translatedRecipes[translationCode];

    return (
      <Router>
        <Nav setTranslationCode={this.setTranslationCode}></Nav>
        <Switch>
          <Route path="/" exact component={Home}>
            <Home recipes={translatedRecipes} />
          </Route>
          {translatedRecipes.map((recipe, index) => (
            <Route
              key={index}
              path={`/recipe/${recipe.route}`}
              exact
              render={() => <Recipe recipe={recipe}></Recipe>}
            ></Route>
          ))}
        </Switch>
        <Footer></Footer>
      </Router>
    );
  }
}

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
});
