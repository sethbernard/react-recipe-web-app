import React, { Component } from 'react';
import RecipeSearch from '../RecipeSearch';
import RecipeCards from '../RecipeCards';
import LoadingScreen from '../LoadingScreen';
import { PATH, APP_ID, API_KEY } from '../../utils/edamam-api-info';
import { Grid, Button, Dimmer, Loader } from 'semantic-ui-react';
import axios from 'axios';
// import firebase from '../../firebase/config';

class HomePage extends Component {
  state = {
    recipeSearchTerm: 'pulled+pork',
    recipes: [],
    toParameter: 12,
    loading: true,
    error: null
  };

  componentDidMount() {
    this.getData();
    // console.log(firebase.auth().currentUser);
  }

  // Get recipes for the recipe search term
  getData = async () => {
    try {
      const { recipeSearchTerm, toParameter } = this.state;
      const response = await axios.get(
        `${PATH}?q=${recipeSearchTerm}&app_id=${APP_ID}&app_key=${API_KEY}&to=${toParameter}`
      );
      const recipes = await response.data.hits;
      await this.setState(prevState => ({
        ...prevState,
        recipes,
        loading: false
      }));
    } catch (error) {
      this.setState({ error });
    }
  };

  // Set current state to what is in the search box
  handleChange = e => {
    this.setState({ recipeSearchTerm: e.target.value });
  };

  // Load while data is being fetched and then populate page with recipe cards and their data
  handleSubmit = async e => {
    e.preventDefault();

    await this.setState({
      loading: true,
      toParameter: 12
    });
    await this.getData();
  };

  // Increase amount of recipe cards being populated on page
  handleToParameter = async () => {
    await this.setState(prevState => ({
      ...prevState,
      toParameter: this.state.toParameter + 12
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
        {this.state.loading ? (
          <LoadingScreen />
        ) : (
          <>
            <RecipeCards
              recipes={this.state.recipes}
              loading={this.state.loading}
            />

            <Grid centered container>
              <Button
                size="large"
                color="blue"
                style={{ margin: '2rem 0 1rem 0' }}
                onClick={this.handleToParameter}
              >
                LOAD MORE RECIPES
              </Button>
            </Grid>
          </>
        )}
      </div>
    );
  }
}

export default HomePage;
