import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Grid, Segment } from 'semantic-ui-react';
import RecipeCard from '../RecipeCard';
import LoadingScreen from '../globals/LoadingScreen';
import NotAuthedModal from '../modals/NotAuthedModal';
import firebase from '../../firebase/config';
import { db } from '../../firebase/config';

class SavedRecipesPage extends Component {
  _isMounted = false;
  state = { savedRecipes: [], loading: true, username: '', error: null };

  // Get reference to user recipes
  getSavedRecipesRef = user => {
    return db
      .collection('userrecipes')
      .where('userId', '==', user.uid)
      .get();
  };

  // Delete user recipe document by id
  deleteRecipe = async id => {
    try {
      await db
        .collection('userrecipes')
        .doc(id)
        .delete();

      let savedRecipes = await this.state.savedRecipes.filter(recipe => {
        return recipe.id !== id; // Filter out the deleted recipe and save the updated recipes to state
      });
      await this.setState({ ...this.state, savedRecipes });
    } catch (error) {
      this.setState({ ...this.state, error });
      console.error(error);
    }
  };

  saveUserRecipesToState = () => {
    // Had to use this method or else user was undefined on re-render using const user = firebase.auth().currentUser
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const savedRecipesRef = this.getSavedRecipesRef(user);
        savedRecipesRef
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.setState({
                savedRecipes: [...this.state.savedRecipes, doc.data()],
                loading: false,
                username: user.displayName.toUpperCase()
              });
            });
          })
          .catch(error => {
            this.setState({ ...this.state, error });
            console.error(error);
          });
      } else {
        this.setState({ loading: false });
      }
    });
  };

  componentDidMount = () => {
    this._isMounted = true;

    if (!this.state.savedRecipes.length && this._isMounted) {
      this.setState({
        loading: false
      });
    }
    this.saveUserRecipesToState();
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  render() {
    const { loading, username, savedRecipes } = this.state;

    if (loading) {
      return <LoadingScreen />;
    }

    if (!loading && this.props.auth) {
      return (
        <>
          <Grid centered style={{ marginTop: '4rem' }}>
            <Grid.Column mobile={10} tablet={8} computer={6}>
              <Segment raised>
                <h1 style={{ textAlign: 'center' }}>
                  {username && savedRecipes.length
                    ? `${username} has ${savedRecipes.length} Saved Recipes`
                    : `You have 0 Saved Recipes`}
                </h1>
              </Segment>
            </Grid.Column>
          </Grid>
          <Grid
            columns={3}
            stackable
            centered
            container
            style={{ marginTop: '1rem' }}
          >
            <Grid.Row stretched>
              {savedRecipes.map((recipe, index) => {
                return (
                  <Grid.Column key={index} width={5}>
                    <RecipeCard
                      key={index}
                      image={recipe.image}
                      header={recipe.label}
                      meta={recipe.source}
                      link={
                        <Link
                          to={{
                            pathname: `/recipe/${recipe.id}`,
                            state: {
                              id: recipe.id,
                              label: recipe.label,
                              image: recipe.image,
                              source: recipe.source,
                              url: recipe.url,
                              servings: recipe.servings,
                              dietLabels: recipe.dietlabels,
                              ingredientLines: recipe.ingredientLines,
                              calories: recipe.calories,
                              totalTime: recipe.totalTime,
                              healthLabels: recipe.healthLabels,
                              cautions: recipe.cautions
                            }
                          }}
                        >
                          View Info
                        </Link>
                      }
                      deleteRecipe={() => {
                        this.deleteRecipe(recipe.id);
                      }}
                    />
                  </Grid.Column>
                );
              })}
            </Grid.Row>
          </Grid>
        </>
      );
    } else {
      return <NotAuthedModal />;
    }
  }
}

export default withRouter(SavedRecipesPage);
