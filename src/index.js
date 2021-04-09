import React from 'react';
import ReactDOM from 'react-dom';


import "./styles/index.scss";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import ContentfulHelper from "./helpers/ContentfulHelper";

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


document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
});
