import React, { Component } from 'react';
import RecipeSearch from './RecipeSearch';

class HomePage extends Component {
  state = {
    recipeSearchTerm: ''
  };

  handleChange = e => {
    this.setState({ recipeSearchTerm: e.target.value });
    console.log(this.state.recipeSearchTerm);
  };

  handleSubmit = () => {
    console.log('You pressed the recipe search button!');
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
