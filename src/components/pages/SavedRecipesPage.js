import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import RecipeCard from '../RecipeCard';
import LoadingScreen from '../LoadingScreen';
import firebase from '../../firebase/config';
import 'firebase/firestore';
import 'firebase/auth';

class SavedRecipesPage extends Component {
  state = { savedRecipes: [], loading: true };

  // Get reference to user recipes
  getSavedRecipesRef = user => {
    return firebase
      .firestore()
      .collection('userrecipes')
      .where('userId', '==', user.uid)
      .get();
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
                loading: false
              });
            });
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        this.setState({ loading: false });
      }
    });
  };

  componentDidMount = () => {
    // if (!this.state.loading) {
    //   this.setState({ loading: true });
    // }
    this.saveUserRecipesToState();
  };

  render() {
    const { loading } = this.state;
    if (loading) {
      return <LoadingScreen />;
    }

    if (!loading && this.props.auth) {
      return (
        <Grid columns={3} stackable centered container>
          {this.state.savedRecipes.map((recipe, index) => {
            return (
              <Grid.Column key={index} width={5} style={{ marginTop: '3rem' }}>
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
                      View Recipe
                    </Link>
                  }
                />
              </Grid.Column>
            );
          })}
        </Grid>
      );
    } else {
      return <h3>Please login or signup to view this page!</h3>;
    }
  }
}

export default withRouter(SavedRecipesPage);
