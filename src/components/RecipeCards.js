import React from 'react';
import RecipeCard from './RecipeCard';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const RecipeCards = ({ recipes }) => {
  return (
    <Grid columns={3} stackable centered container>
      <Grid.Row stretched>
        {recipes.map((card, index) => {
          const {
            label,
            image,
            source,
            uri,
            url,
            dietLabels,
            ingredientLines,
            calories,
            totalTime,
            healthLabels,
            cautions
          } = card.recipe;

          const id = uri.replace(
            'http://www.edamam.com/ontologies/edamam.owl#recipe_', // Make custom ID
            ''
          );

          return (
            <Grid.Column key={index} width={5}>
              <RecipeCard
                image={image}
                header={label}
                meta={source}
                id={id}
                link={
                  <Link
                    to={{
                      pathname: `/recipe/${id}`,
                      state: {
                        id,
                        label,
                        image,
                        source,
                        url,
                        servings: card.recipe.yield, // had to use servings as a key because yield is a reserved keyword
                        dietLabels,
                        ingredientLines,
                        calories,
                        totalTime,
                        healthLabels,
                        cautions
                      }
                    }}
                  >
                    View Info
                  </Link>
                }
              />
            </Grid.Column>
          );
        })}
      </Grid.Row>
    </Grid>
  );
};

export default RecipeCards;
