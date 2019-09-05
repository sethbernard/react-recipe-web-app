import React, { useEffect } from 'react';
import RecipeHeader from './RecipeHeader';
import TimeServingsCalories from './TimeServingsCalories';
import RecipeImage from './RecipeImage';
import HealthLabels from './HealthLabels';
import IngredientsList from './IngredientsList';
import DietLabels from './DietLabels';
import CautionLabels from './pages/CautionLabels';
import ExternalLink from './ExternalLink';
import SaveRecipeButton from './SaveRecipeButton';
import { Grid, Image } from 'semantic-ui-react';
import firebase from '../firebase/config';

const Recipe = props => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const recipeData = props.location.state; // store recipe data being transfered from react router

  // Save recipe id to database for logged in user
  const handleSaveRecipe = async recipeData => {
    try {
      const user = await firebase.auth().currentUser;
      const db = await firebase.firestore();
      await db
        .collection('userrecipes')
        .doc(recipeData.id) // Add a new document in collection
        .set({
          saved: true,
          userId: user.uid,
          ...recipeData
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid columns={2} stackable container>
      <Grid.Column size={12}>
        <RecipeHeader header={recipeData.label} />
        <TimeServingsCalories
          totalTime={recipeData.totalTime}
          servings={recipeData.servings}
          calories={recipeData.calories}
        />
        <HealthLabels healthLabels={recipeData.healthLabels} />
      </Grid.Column>

      <RecipeImage image={recipeData.image} />

      <Grid.Column>
        <IngredientsList ingredients={recipeData.ingredientLines} />
        <ExternalLink url={recipeData.url} />
      </Grid.Column>

      <Grid.Column size={4} textAlign="center" style={{ marginTop: '2.5rem' }}>
        <DietLabels dietLabels={recipeData.dietLabels} />
        <CautionLabels cautions={recipeData.cautions} />
        <SaveRecipeButton handleClick={() => handleSaveRecipe(recipeData)} />
      </Grid.Column>
    </Grid>
  );
};

export default Recipe;
