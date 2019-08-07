import React, { Component } from 'react';
import RecipeSearch from '../RecipeSearch';
import RecipeCards from '../RecipeCards';
import { PATH, APP_ID, API_KEY } from '../../utils/edamam-api-info';
import axios from 'axios';

class HomePage extends Component {
  state = {
    recipeSearchTerm: 'pulled+pork',
    recipes: [],
    error: null
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const { recipeSearchTerm } = this.state;
      const response = await axios.get(
        `${PATH}?q=${recipeSearchTerm}&app_id=${APP_ID}&app_key=${API_KEY}&to=12`
      );
      const recipes = response.data.hits;
      await this.setState(prevState => ({
        ...prevState,
        recipes
      }));
    } catch (error) {
      this.setState({ error });
    }
  };

  handleChange = e => {
    this.setState({ recipeSearchTerm: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.getData();
  };

  render() {
    return (
      <div>
        <RecipeSearch
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <RecipeCards recipes={this.state.recipes} />
      </div>
    );
  }
}

export default HomePage;
