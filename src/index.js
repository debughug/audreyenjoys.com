import "./styles/index.scss";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

import ContentfulHelper from "./helpers/ContentfulHelper";

import Nav from './layouts/nav';
import Home from "./routes/home";
import Recipe from "./routes/recipe";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    };

    this.ContentfulHelper = new ContentfulHelper();
  }

  componentDidMount() {
    let ReactThis = this;

    axios
      .get(`https://audreyenjoys.s3-us-west-2.amazonaws.com/recipes.json`)
      .then(function (response) {
        ReactThis.ContentfulHelper.setAssets(response.data.includes.Asset);
        ReactThis.ContentfulHelper.setRecipes(response.data.items);
        ReactThis.setState({
          recipes: ReactThis.ContentfulHelper.getRecipes(),
        });
      });
  }

  render() {
    return (
      <Router>
        <Nav></Nav>
        <Switch>
          <Route path="/" exact component={Home}>
            <Home recipes={this.state.recipes} />
          </Route>
          {this.state.recipes.map((recipe) => (
            <Route
              path={`/recipe/${recipe.route}`}
              exact
              render={() => <Recipe recipe={recipe}></Recipe>}
            ></Route>
          ))}
        </Switch>
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
