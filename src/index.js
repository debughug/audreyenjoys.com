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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      translationCode: "en",
      translatedRecipes: {},
    };
  }

  componentDidMount() {
    let that = this;
    let englishCall = axios.get(
      "https://audreyenjoys.s3-us-west-2.amazonaws.com/recipes.json"
    );

    let spanishCall = axios.get(
      "https://audreyenjoys.s3-us-west-2.amazonaws.com/recipes-es.json"
    );

    axios.all([englishCall, spanishCall]).then(
      axios.spread(function (englishRes, spanishRes) {
        let ContentfulHelperEnglish = new ContentfulHelper();
        let ContentfulHelperSpanish = new ContentfulHelper();

        ContentfulHelperEnglish.setAssets(englishRes.data.includes.Asset);
        ContentfulHelperEnglish.setRecipes(englishRes.data.items);
        ContentfulHelperSpanish.setAssets(spanishRes.data.includes.Asset);
        ContentfulHelperSpanish.setRecipes(spanishRes.data.items);

        that.setState({
          isLoading: false,
          translatedRecipes: {
            en: ContentfulHelperEnglish.getRecipes(),
            es: ContentfulHelperSpanish.getRecipes(),
          },
        });
      })
    );
  }

  render() {
    // Add loading state my dude
    let isLoading = this.state.isLoading;
    if (isLoading) {
      return <div></div>;
    }
    // Add loading state my dude

    let translationCode = this.state.translationCode;
    let translatedRecipes = this.state.translatedRecipes[translationCode];

    return (
      <Router>
        <Nav></Nav>
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
