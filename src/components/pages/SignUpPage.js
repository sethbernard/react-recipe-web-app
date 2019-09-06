import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../firebase/config';
import 'firebase/auth';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

class SignUpPage extends Component {
  state = {
    displayName: '',
    email: '',
    password: '',
    passwordTwo: '',
    error: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Add Sign Up Event
  handleSignUp = async e => {
    e.preventDefault();
    const { email, password, displayName } = this.state;
    const auth = firebase.auth();

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      const user = await firebase.auth().currentUser;
      await user.updateProfile({ displayName }); // Add displayName to firestore
      await this.props.history.push('/'); // redirect authenticated user to home page
    } catch (error) {
      this.setState({ error });
    }
  };

  // Very simple form validation
  isInvalid = () => {
    const { email, password, passwordTwo } = this.state;
    if (email === '' || password === '') {
      return true;
    }
    if (password !== passwordTwo) {
      return true;
    }
  };

  render() {
    const { error } = this.state;

    return (
      <Grid
        textAlign="center"
        style={{ height: '75vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
            Sign up for your account
          </Header>
          <Form
            size="large"
            style={{ margin: '1rem' }}
            onSubmit={this.handleSignUp}
          >
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                name="displayName"
                autoComplete="displayName"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail address"
                name="email"
                autoComplete="email"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                autoComplete="password"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                type="password"
                name="passwordTwo"
                autoComplete="passwordTwo"
                onChange={this.handleChange}
              />
              <Button
                color="blue"
                fluid
                size="large"
                disabled={this.isInvalid()}
              >
                Sign Up
              </Button>
            </Segment>
          </Form>

          {error && <p>{error.message}</p>}
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(SignUpPage);
