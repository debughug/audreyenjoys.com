import "./styles/index.scss";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import ContentfulHelper from "./helpers/ContentfulHelper";

import Nav from "./layouts/nav";
import Footer from "./layouts/footer";
import Home from "./routes/Home";
import Recipe from "./routes/Recipe";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    };

    this.ContentfulHelper = new ContentfulHelper();
  }

  componentDidMount() {
    let that = this;

    axios
      .get(`https://audreyenjoys.s3-us-west-2.amazonaws.com/recipes.json`)
      .then(function (response) {
        that.ContentfulHelper.setAssets(response.data.includes.Asset);
        that.ContentfulHelper.setRecipes(response.data.items);
        that.setState({
          recipes: that.ContentfulHelper.getRecipes(),
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
          {this.state.recipes.map((recipe, index) => (
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
