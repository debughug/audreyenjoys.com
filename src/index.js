import "./styles/index.scss";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import Nav from "./layouts/Nav";
import Footer from "./layouts/Footer";
import Loading from "./routes/Loading";
import Recipes from "./routes/Recipes";
import Recipe from "./routes/Recipe";
import Links from "./routes/Links";

import ContentfulHelper from "./helpers/ContentfulHelper";
import Endpoints from "./configs/Endpoints";

window.UITranslations = require("./configs/UITranslations").default;

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

    axios.all([axios.get(Endpoints.recipes.en), axios.get(Endpoints.recipes.es)]).then(
      axios.spread(function (enRes, esRes) {
        let Helper = new ContentfulHelper();
        let translatedRecipes = {};

        Helper.setTranslationCode("en");
        Helper.setAssets(enRes.data.includes.Asset);
        Helper.setRecipes(enRes.data.items);
        translatedRecipes.en = Helper.getRecipes();

        Helper.setTranslationCode("es");
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
    let isLoading = this.state.isLoading;
    let View = <Loading></Loading>;

    if (!isLoading) {
      let translationCode = this.state.translationCode;
      let translatedRecipes = this.state.translatedRecipes[translationCode];

      View = (
        <Router>
          <Nav translationCode={translationCode}></Nav>
          <Switch>
            <Route path="/" exact component={Recipes}>
              <Recipes recipes={translatedRecipes}></Recipes>
            </Route>
            <Route path="/links" exact component={Recipes}>
              <Links></Links>
            </Route>

            {translatedRecipes.map((recipe, index) => (
              <Route
                key={index}
                path={`/${recipe.route}`}
                exact
                render={() => (
                  <Recipe
                    recipe={recipe}
                    translationCode={translationCode}
                    setTranslationCode={this.setTranslationCode}
                  ></Recipe>
                )}
              ></Route>
            ))}
          </Switch>
          <Footer></Footer>
        </Router>
      );
    }

    return View;
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
