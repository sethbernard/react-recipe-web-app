import React from 'react';
import { Card } from 'semantic-ui-react';

const RecipeCard = ({ image, header, meta, link }) => {
  return <Card image={image} header={header} meta={meta} extra={link} />;
};

export default RecipeCard;
