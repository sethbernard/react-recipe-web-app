import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase/config';
import 'firebase/auth';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
    error: null
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogIn = async () => {
    const { email, password } = this.state;
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log(user);
      await this.props.history.push('/'); // redirect authenticated user to home page
    } catch (error) {
      this.setState({ error });
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
            Log in to your account :)
          </Header>
          <Form
            size="large"
            style={{ margin: '1rem' }}
            onSubmit={this.handleLogIn}
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
                //disabled={this.isInvalid()}
              >
                Log In
              </Button>
            </Segment>
          </Form>

          {error && <p>Error: {error.message}</p>}
          <p>
            Don't have an account yet?
            <br />
            Sign up <Link to="/signup">here</Link>
          </p>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(LoginPage);
