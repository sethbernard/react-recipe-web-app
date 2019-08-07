import React from 'react';
import {
  Header,
  Segment,
  Grid,
  Icon,
  Image,
  List,
  Label,
  Divider
} from 'semantic-ui-react';

const RecipePage = props => {
  console.log(props);

  const {
    label,
    totalTime,
    servings,
    calories,
    image,
    ingredientLines,
    dietLabels,
    healthLabels,
    cautions,
    url
  } = props.location.state;

  return (
    <Grid columns={2} stackable container>
      <Grid.Column size={12}>
        <Header as="h1" style={{ margin: '2rem 0rem', textAlign: 'center' }}>
          {label}
        </Header>

        {/* Time, Servings, Calories */}
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

        {/* Health Labels */}
        <Segment
          style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem' }}
        >
          <Header as="h3">Health Labels</Header>
          {healthLabels.map((healthLabel, i) => {
            return (
              <Label key={i} size="large" color="green">
                {healthLabel}
              </Label>
            );
          })}
        </Segment>
      </Grid.Column>

      <Grid.Column size={4} textAlign="center">
        <Image src={image} size="medium" spaced="left" rounded raised />
      </Grid.Column>

      {/* Ingredients List */}
      <Grid.Column>
        <Header as="h3" textAlign="center">
          Ingredients List
        </Header>
        <Segment raised style={{ height: '100%', padding: '2rem' }}>
          <List bulleted>
            {ingredientLines.map((step, i) => {
              return (
                <List.Item key={i} style={{ marginBottom: '1rem' }}>
                  {step}
                </List.Item>
              );
            })}
          </List>
        </Segment>
      </Grid.Column>

      {/* Diet Labels */}
      <Grid.Column size={4} textAlign="center" style={{ marginTop: '2.5rem' }}>
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
              None
            </Label>
          )}
          <Divider section />

          {/* Caution Labels */}
          <div style={{ marginTop: '1rem' }}>
            <Header as="h3">Cautions</Header>
            {cautions.map((caution, i) => {
              return (
                <Label key={i} size="large" color="red">
                  {caution}
                </Label>
              );
            })}
          </div>
        </Segment>

        {/* Recipe External Link */}
        <Segment style={{ marginTop: '3rem', fontSize: '1.2rem' }} raised>
          View full recipe with directions
          <a href={url} target="_blank" rel="noopener noreferrer">
            {' '}
            here
          </a>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default RecipePage;
