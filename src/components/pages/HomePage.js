import React, { Component } from 'react';
import RecipeSearch from '../RecipeSearch';
import RecipeCards from '../RecipeCards';
import LoadingScreen from '../globals/LoadingScreen';
import { PATH, APP_ID, API_KEY } from '../../utils/edamam-api-info';
import { Grid, Header, Button } from 'semantic-ui-react';
import axios from 'axios';

class HomePage extends Component {
  state = {
    recipeSearchTerm: 'chicken+parmesan',
    recipes: [],
    toParameter: 12,
    loading: true,
    error: null
  };

  componentDidMount() {
    this.getData();
  }

  // Get recipes for the recipe search term
  getData = async () => {
    try {
      const { recipeSearchTerm, toParameter } = this.state;
      const response = await axios.get(
        `${PATH}?q=${recipeSearchTerm}&app_id=${APP_ID}&app_key=${API_KEY}&to=${toParameter}`
      );
      const recipes = await response.data.hits;
      await this.setState((prevState) => ({
        ...prevState,
        recipes,
        loading: false
      }));
    } catch (error) {
      this.setState({ error });
    }
  };

  // Set current state to what is in the search box
  handleChange = (e) => {
    this.setState({ recipeSearchTerm: e.target.value });
  };

  // Load while data is being fetched and then populate page with recipe cards and their data
  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
      toParameter: 12
    });
    await this.getData();
  };

  // Increase amount of recipe cards being populated on page
  handleToParameter = async () => {
    this.setState((prevState) => ({
      ...prevState,
      toParameter: this.state.toParameter + 12
      // loading: true
    }));
    await this.getData();
  };

  render() {
    const { recipes, loading } = this.state;
    return (
      <div>
        <Header
          as='h1'
          style={{
            textAlign: 'center',
            margin: '4rem 0 0',
            letterSpacing: '3px',
            color: '#09186A',
            fontSize: '42px'
          }}
        >
          <strong>PALATE</strong>
        </Header>
        <Header
          as='h3'
          style={{
            textAlign: 'center',
            marginTop: '.25rem',
            fontStyle: 'italic'
          }}
        >
          A recipe app
        </Header>
        <RecipeSearch
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            <RecipeCards recipes={recipes} loading={loading} />

            <Grid centered container>
              <Button
                size='large'
                style={{
                  margin: '2rem 0 1rem 0',
                  backgroundColor: '#09186A',
                  color: '#fff',
                  border: '2px solid rgba(34,36,38,.15)'
                }}
                onClick={this.handleToParameter}
              >
                Load more
              </Button>
            </Grid>
          </>
        )}
      </div>
    );
  }
}

export default HomePage;
