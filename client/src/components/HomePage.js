import React, { Component } from 'react';
import RecipeSearch from './RecipeSearch';
import { PATH, APP_ID, API_KEY } from '../utils/edamam-api-info';
import axios from 'axios';

class HomePage extends Component {
  state = {
    recipeSearchTerm: 'beef',
    data: [],
    error: null
  };

  componentDidMount() {
    // this.getData();
  }

  getData = async () => {
    try {
      const { recipeSearchTerm } = this.state;
      const response = await axios.get(
        `${PATH}?q=${recipeSearchTerm}&app_id=${APP_ID}&app_key=${API_KEY}`
      );

      const data = response.data.hits;

      await this.setState(prevState => ({
        ...prevState,
        data
      }));

      await console.log(this.state.data);
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
      </div>
    );
  }
}

export default HomePage;
