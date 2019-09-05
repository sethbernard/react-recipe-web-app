import React from 'react';
import { Segment } from 'semantic-ui-react';

const ExternalLink = ({ url }) => {
  return (
    <Segment
      style={{
        margin: '2rem 0 2rem 0',
        fontSize: '1.2rem',
        textAlign: 'center'
      }}
      raised
    >
      View full recipe with directions
      <a href={url} target="_blank" rel="noopener noreferrer">
        {' '}
        here
      </a>
    </Segment>
  );
};

export default ExternalLink;
