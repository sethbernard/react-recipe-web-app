import React from 'react';
import RecipeCard from './RecipeCard';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const RecipeCards = ({ recipes }) => {
  return (
    <Grid columns={3} stackable centered container>
      {recipes.map((card, index) => {
        const uri = card.recipe.uri;
        const id = uri.replace(
          'http://www.edamam.com/ontologies/edamam.owl#recipe_', // Make custom ID
          ''
        );
        return (
          <Grid.Column key={index} width={5}>
            <RecipeCard
              image={card.recipe.image}
              header={card.recipe.label}
              meta={card.recipe.source}
              id={id}
              link={
                <Link
                  to={{
                    pathname: `/recipe/${id}`,
                    state: {
                      label: card.recipe.label, // Find a way to destructure card.recipe
                      image: card.recipe.image,
                      source: card.recipe.source,
                      url: card.recipe.url,
                      servings: card.recipe.yield,
                      dietLabels: card.recipe.dietLabels,
                      ingredients: card.recipe.ingredientLines,
                      calories: card.recipe.calories,
                      totalTime: card.recipe.totalTime,
                      healthLabels: card.recipe.healthLabels,
                      cautions: card.recipe.cautions
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
};

export default RecipeCards;
