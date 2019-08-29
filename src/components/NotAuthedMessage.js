import React from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NotAuthedMessage = () => {
  return (
    <Grid
      style={{
        margin: '5rem',
        justifyContent: 'center'
      }}
    >
      <Grid.Row>
        <Header as="h1" color="red" textAlign="center">
          Please login or signup to view this page!
        </Header>
      </Grid.Row>

      <Grid.Row>
        <Link to="/login">
          <Button color="blue" size="large" style={{ marginRight: '1rem' }}>
            Log In
          </Button>
        </Link>

        <Link to="/signup">
          <Button color="blue" size="large">
            Sign Up
          </Button>
        </Link>
      </Grid.Row>
    </Grid>
  );
};

export default NotAuthedMessage;
