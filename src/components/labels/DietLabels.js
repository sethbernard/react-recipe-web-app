import React from 'react';
import { Segment, Label, Header } from 'semantic-ui-react';

const DietLabels = ({ dietLabels }) => {
  return (
    <Segment raised style={{ padding: '2rem' }}>
      <Header as="h3">Diet Labels</Header>
      {dietLabels && dietLabels.length ? (
        dietLabels.map((dietLabel, i) => {
          return (
            <Label key={i} size="large" color="blue">
              {dietLabel}
            </Label>
          );
        })
      ) : (
        <Label size="large" color="blue">
          No Diet Labels
        </Label>
      )}
    </Segment>
  );
};

export default DietLabels;
