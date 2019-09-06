import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const SaveRecipeButton = ({ handleClick }) => {
  return (
    <Button
      size="large"
      style={{ margin: '2rem 0 2rem 0', letterSpacing: '2px' }}
      onClick={handleClick}
    >
      <Link to="/saved-recipes">
        SAVE RECIPE
        <Icon name="save" style={{ margin: '0 0 0 4px' }} />
      </Link>
    </Button>
  );
};

export default SaveRecipeButton;
