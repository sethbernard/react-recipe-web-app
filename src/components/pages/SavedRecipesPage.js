import React, { Component } from 'react';
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
    }, 500);

    // setTimeout(() => {
    //   console.log(this.state.savedRecipes);
    // }, 3000);
  }

  render() {
    return (
      <div>
        Saved Recipes Page
        {this.state.savedRecipes.map((recipe, index) => {
          return (
            <RecipeCard
              key={index}
              image={recipe.image}
              header={recipe.label}
              meta={recipe.source}
            />
          );
        })}
      </div>
    );
  }
}

export default SavedRecipesPage;
