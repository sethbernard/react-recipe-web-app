import React from 'react';
import { Segment, Header, Label, Icon } from 'semantic-ui-react';

const CautionLabels = ({ cautions }) => {
  return (
    <Segment raised style={{ marginTop: '3rem', padding: '2rem' }}>
      <Header as="h3">Cautions</Header>
      {cautions && cautions.length ? (
        cautions.map((caution, i) => {
          return (
            <Label
              key={i}
              size="large"
              color="red"
              style={{ marginBottom: '4px' }}
            >
              {caution}
            </Label>
          );
        })
      ) : (
        <Label size="large" color="red">
          None <Icon style={{ margin: '0 0 0 2px' }} name="smile" />
        </Label>
      )}
    </Segment>
  );
};

export default CautionLabels;
