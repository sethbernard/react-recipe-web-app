import React from 'react';
import { Header, Segment, List } from 'semantic-ui-react';

const IngredientsList = ({ ingredients }) => {
  return (
    <div>
      <Header as="h3" textAlign="center">
        Ingredients List
      </Header>
      <Segment raised style={{ minHeight: '287px', padding: '2rem' }}>
        <List bulleted>
          {ingredients.map((step, i) => {
            return (
              <List.Item key={i} style={{ marginBottom: '1rem' }}>
                {step}
              </List.Item>
            );
          })}
        </List>
      </Segment>
    </div>
  );
};

export default IngredientsList;
