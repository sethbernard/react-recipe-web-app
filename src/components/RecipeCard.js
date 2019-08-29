import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const RecipeCard = ({ ...props }) => {
  return (
    <Card>
      <Image src={props.image} />
      <Card.Content>
        <Card.Header>{props.header}</Card.Header>
        <Card.Meta style={{ marginTop: '0.5rem' }}>{props.meta}</Card.Meta>
      </Card.Content>
      <Card.Content
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <span>{props.link}</span>
        <span onClick={props.deleteRecipe}>
          <Button style={{ background: 'none', border: 'none', padding: '0' }}>
            {props.location.pathname === '/saved-recipes'
              ? 'Delete Recipe'
              : null}
          </Button>
        </span>
      </Card.Content>
    </Card>
  );
};

export default withRouter(RecipeCard);
