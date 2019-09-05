import React from 'react';
import { Segment, Header, Label } from 'semantic-ui-react';

const CautionLabels = ({ cautions }) => {
  return (
    <Segment raised style={{ marginTop: '3rem', padding: '2rem' }}>
      <Header as="h3">Cautions</Header>
      {cautions && cautions.length ? (
        cautions.map((caution, i) => {
          return (
            <Label key={i} size="large" color="red">
              {caution}
            </Label>
          );
        })
      ) : (
        <Label size="large" color="red">
          No Cautions
        </Label>
      )}
    </Segment>
  );
};

export default CautionLabels;
