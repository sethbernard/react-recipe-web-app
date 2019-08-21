import React from 'react';
import firebase from '../firebase/config';
import 'firebase/auth';
import { Link } from 'react-router-dom';

import {
  Header,
  Segment,
  Grid,
  Icon,
  Image,
  List,
  Label,
  Button
} from 'semantic-ui-react';

const Recipe = props => {
  console.log(props);

  const {
    id,
    label,
    source,
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

  const recipeData = props.location.state;

  console.log(recipeData);

  // Save recipe id to database for logged in user
  const handleSaveRecipe = recipeData => {
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;

    // Add a new document in collection
    db.collection('userrecipes')
      .doc(recipeData.id)
      .set({
        id,
        saved: true,
        userId: user.uid,
        image,
        label,
        source,
        totalTime,
        servings,
        calories,
        ingredientLines,
        dietLabels,
        healthLabels,
        cautions,
        url
      })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch(error => {
        console.error('Error writing document: ', error);
      });
  };

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
      </Grid.Column>

      {/* Recipe Image */}
      <Grid.Column size={4} textAlign="center" style={{ marginTop: '3rem' }}>
        <Image src={image} size="medium" spaced="left" rounded raised />
      </Grid.Column>

      {/* Ingredients List */}
      <Grid.Column>
        <Header as="h3" textAlign="center">
          Ingredients List
        </Header>
        <Segment raised style={{ minHeight: '287px', padding: '2rem' }}>
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

        {/* Recipe External Link */}
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
              No Diet Labels
            </Label>
          )}
        </Segment>

        {/* Caution Labels */}
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

        {/* Save Recipe Button */}
        <Button
          size="large"
          style={{ margin: '2rem 0 2rem 0' }}
          onClick={() => handleSaveRecipe(recipeData)}
        >
          <Link to="/saved-recipes">Save Recipe</Link>
        </Button>
      </Grid.Column>
    </Grid>
  );
};

export default Recipe;
