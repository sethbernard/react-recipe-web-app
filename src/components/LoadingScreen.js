import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingScreen = () => {
  return (
    <div>
      <Dimmer active inverted size="large">
        <Loader />
      </Dimmer>
    </div>
  );
};

export default LoadingScreen;
