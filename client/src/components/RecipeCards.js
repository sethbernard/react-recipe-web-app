import React from 'react';
import RecipeCard from './RecipeCard';
import { Grid } from 'semantic-ui-react';

const RecipeCards = ({ data }) => {
  return (
    <Grid columns={3} stackable centered container>
      {data.map((card, index) => {
        return (
          <Grid.Column key={index} width={5}>
            <RecipeCard
              image={card.recipe.image}
              header={card.recipe.label}
              meta={card.recipe.source}
              //   description={
              //     card.recipe.totalTime !== 0
              //       ? ` ${card.recipe.totalTime} minutes`
              //       : ''
              //   }
            />
          </Grid.Column>
        );
      })}
    </Grid>
  );
};

export default RecipeCards;
