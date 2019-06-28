import React from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const extra = <Link to="/recipe">View Recipe</Link>;

const RecipeCard = ({ image, header, meta, description }) => {
  return (
    <Card
      image={image}
      header={header}
      meta={meta}
      // description={description}
      extra={extra}
    />
  );
};

export default RecipeCard;
