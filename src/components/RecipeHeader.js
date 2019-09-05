import React from 'react';
import { Header } from 'semantic-ui-react';

const RecipeHeader = ({ header }) => {
  return (
    <Header as="h1" style={{ margin: '2rem 0rem', textAlign: 'center' }}>
      {header}
    </Header>
  );
};

export default RecipeHeader;
