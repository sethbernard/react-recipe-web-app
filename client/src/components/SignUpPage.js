import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import fb from '../firebase/config';
import 'firebase/auth';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import HomePage from './HomePage';

class SignUpPage extends Component {
  state = {
    email: '',
    password: '',
    error: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Add Sign Up Event
  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    const auth = fb.auth();

    try {
      const authUser = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(authUser);
      await this.setState({ email: '', password: '', error: '' });
      await this.props.history.push('/'); // redirect authenticated user to home page
    } catch (error) {
      this.setState({ error });
    }
  };

  // Simple form validation
  isInvalid = () => {
    const { email, password } = this.state;
    if (email === '' || password === '') {
      return true;
    }
  };

  render() {
    const { error } = this.state;
    return (
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
            Sign-up for your account
          </Header>
          <Form
            size="large"
            style={{ margin: '1rem' }}
            onSubmit={this.handleSubmit}
          >
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                name="email"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
              <Button
                color="blue"
                fluid
                size="large"
                disabled={this.isInvalid()}
              >
                Sign-Up
              </Button>
            </Segment>
          </Form>

          {error && <p>Error: {error.message}</p>}
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(SignUpPage);
