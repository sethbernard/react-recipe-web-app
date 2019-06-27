import React from 'react';
import { Card, Grid, Icon } from 'semantic-ui-react';

const RecipeCard = ({ image, header }) => {
  return (
    <Grid.Column>
      <Card image={image} header={header} raised />
    </Grid.Column>
  );
};

export default RecipeCard;
