import React from 'react';
import RecipeCard from './RecipeCard';
import { Grid } from 'semantic-ui-react';

const RecipeCards = ({ data }) => {
  return (
    <Grid columns={3} stackable centered container>
      {data.map((card, index) => {
        return (
          <Grid.Column width={5}>
            <RecipeCard
              key={index}
              image={card.recipe.image}
              header={card.recipe.label}
            />
          </Grid.Column>
        );
      })}
    </Grid>
  );
};

export default RecipeCards;
