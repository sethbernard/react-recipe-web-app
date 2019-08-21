import React, { Component } from 'react';
import RecipeSearch from '../RecipeSearch';
import RecipeCards from '../RecipeCards';
import { PATH, APP_ID, API_KEY } from '../../utils/edamam-api-info';
import { Grid, Button } from 'semantic-ui-react';
import axios from 'axios';
// import firebase from '../../firebase/config';

class HomePage extends Component {
  state = {
    recipeSearchTerm: 'pulled+pork',
    recipes: [],
    toParameter: 6,
    error: null
  };

  componentDidMount() {
    this.getData();
    // console.log(firebase.auth().currentUser);
  }

  getData = async () => {
    try {
      const { recipeSearchTerm, toParameter } = this.state;
      const response = await axios.get(
        `${PATH}?q=${recipeSearchTerm}&app_id=${APP_ID}&app_key=${API_KEY}&to=${toParameter}`
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

  handleToParameter = async () => {
    await this.setState(prevState => ({
      ...prevState,
      toParameter: this.state.toParameter + 6
    }));
    await this.getData();
  };

  render() {
    return (
      <div>
        <RecipeSearch
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <RecipeCards recipes={this.state.recipes} />

        <Grid centered container>
          <Button
            size="large"
            color="blue"
            style={{ margin: '2rem 0 1rem 0' }}
            onClick={this.handleToParameter}
          >
            Load more recipes
          </Button>
        </Grid>
      </div>
    );
  }
}

export default HomePage;
