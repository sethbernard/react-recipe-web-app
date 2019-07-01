import React from 'react';
import RecipeCard from './RecipeCard';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const RecipeCards = ({ recipes }) => {
  return (
    <Grid columns={3} stackable centered container>
      {recipes.map((card, index) => {
        const {
          label,
          image,
          source,
          uri,
          url,
          servings,
          dietLabels,
          ingredients,
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
                      label,
                      image,
                      source,
                      url,
                      servings,
                      dietLabels,
                      ingredients,
                      calories,
                      totalTime,
                      healthLabels,
                      cautions
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
