import React from 'react';
import { Header, Segment, Grid, Icon } from 'semantic-ui-react';

const RecipePage = props => {
  console.log(props);
  const { label, totalTime, servings, calories } = props.location.state;
  return (
    <Grid columns={2} stackable container>
      <Grid.Row>
        <Grid.Column size={8} textAlign="center">
          <Header as="h1">{label}</Header>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column size={8}>
          <Segment.Group horizontal>
            <Segment>
              <Icon name="clock" />
              {totalTime === 0 ? 'N/A' : `${totalTime} minutes`}
            </Segment>
            <Segment>
              <Icon name="food" />
              {servings === undefined ? 'N/A' : `${servings} servings`}
            </Segment>
            <Segment>
              <Icon name="heart" />
              {`${Math.round(calories)} calories`}
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default RecipePage;
