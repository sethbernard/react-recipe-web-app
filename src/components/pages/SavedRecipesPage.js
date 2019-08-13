import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
// import RecipeCards from '../RecipeCards';
import RecipeCard from '../RecipeCard';
import firebase from '../../firebase/config';
import 'firebase/firestore';
import 'firebase/auth';

class SavedRecipesPage extends Component {
  state = { savedRecipes: [] };

  getSavedRecipes = async () => {
    const user = await firebase.auth().currentUser;
    // await console.log(user.uid);
    const savedRecipesRef = await firebase
      .firestore()
      .collection('userrecipes')
      .where('userId', '==', user.uid);

    savedRecipesRef
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({
            savedRecipes: [...this.state.savedRecipes, doc.data()]
          });
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  componentDidMount() {
    setTimeout(() => {
      this.getSavedRecipes();
    }, 100);

    // setTimeout(() => {
    //   console.log(this.state.savedRecipes);
    // }, 5000);
  }

  render() {
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
  }
}

export default withRouter(SavedRecipesPage);
