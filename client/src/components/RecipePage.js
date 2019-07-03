import React from 'react';
import {
  Header,
  Segment,
  Grid,
  Icon,
  Image,
  List,
  Label
} from 'semantic-ui-react';
import Footer from './Footer';

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

        <Segment.Group horizontal raised>
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

        <div style={{ textAlign: 'center' }}>
          <Header as="h3" style={{ marginTop: '3rem' }}>
            Health Labels
          </Header>
          {healthLabels.map(healthLabel => {
            return (
              <Label size="large" color="green" style={{ marginTop: '1rem' }}>
                {healthLabel}
              </Label>
            );
          })}
        </div>
      </Grid.Column>

      <Grid.Column size={4} textAlign="center">
        <Image src={image} size="medium" spaced="left" rounded />
      </Grid.Column>

      <Grid.Column>
        <Header as="h3" textAlign="center">
          Ingredients List
        </Header>
        <Segment raised>
          <List bulleted>
            {ingredientLines.map((step, index) => {
              return (
                <List.Item key={index} style={{ marginBottom: '0.5rem' }}>
                  {step}
                </List.Item>
              );
            })}
          </List>
        </Segment>
      </Grid.Column>

      <Grid.Column size={4} textAlign="center" style={{ marginTop: '8rem' }}>
        <Segment raised>
          <Header as="h3">Diet Labels</Header>
          {dietLabels.map(dietLabel => {
            return (
              <Label size="large" color="blue">
                {dietLabel}
              </Label>
            );
          })}
        </Segment>

        <Segment style={{ marginTop: '3rem' }} raised>
          <Header as="h3">Cautions</Header>
          {cautions.map(caution => {
            return (
              <Label size="large" color="red">
                {caution}
              </Label>
            );
          })}
        </Segment>

        <div style={{ marginTop: '4rem', fontSize: '1.2rem' }}>
          View full recipe with directions
          <a href={url} target="_blank" rel="noopener noreferrer">
            {' '}
            here
          </a>
        </div>
      </Grid.Column>
    </Grid>
  );
};

export default RecipePage;
