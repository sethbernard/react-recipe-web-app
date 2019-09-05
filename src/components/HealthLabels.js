import React from 'react';
import { Label, Header, Segment } from 'semantic-ui-react';

const HealthLabels = ({ healthLabels }) => {
  return (
    <Segment
      raised
      style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem' }}
    >
      <Header as="h3">Health Labels</Header>
      {healthLabels.map((healthLabel, i) => {
        return (
          <Label
            key={i}
            size="large"
            color="green"
            style={{ marginBottom: '4px' }}
          >
            {healthLabel}
          </Label>
        );
      })}
    </Segment>
  );
};

export default HealthLabels;
