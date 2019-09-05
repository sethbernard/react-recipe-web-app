import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

const RecipeImage = ({ image }) => {
  return (
    <Grid.Column size={4} textAlign="center" style={{ marginTop: '3rem' }}>
      <Image src={image} size="medium" spaced="left" rounded />
    </Grid.Column>
  );
};

export default RecipeImage;
