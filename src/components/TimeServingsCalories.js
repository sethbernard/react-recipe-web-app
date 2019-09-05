import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';

const TimeServingsCalories = ({ totalTime, servings, calories }) => {
  return (
    <div>
      <Segment.Group raised horizontal>
        <Segment>
          <Icon name="clock" />
          {totalTime === 0 ? 'N/A' : `${totalTime} minutes`}
        </Segment>
        <Segment>
          <Icon name="food" />
          {servings === undefined ? 'N/A' : `${servings} servings`}
        </Segment>
        <Segment>
          <Icon name="heart" color="red" />
          {`${Math.round(calories)} calories`}
        </Segment>
      </Segment.Group>
    </div>
  );
};

export default TimeServingsCalories;
