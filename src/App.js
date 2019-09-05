import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import firebase from './firebase/config';
import 'firebase/auth';
import Navbar from './components/Navbar';
import HomePage from './components/pages/HomePage';
import SavedRecipesPage from './components/pages/SavedRecipesPage';
import LoginPage from './components/pages/LoginPage';
import SignUpPage from './components/pages/SignUpPage';
import LogoutPage from './components/pages/LogoutPage';
import Recipe from './components/Recipe';
import Footer from './components/Footer';

class App extends Component {
  state = {
    userAuthenticated: false
  };

  componentDidMount = () => {
    // Check to see if a user is authenticated
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ ...this.state, userAuthenticated: true });
      } else {
        this.setState({ userAuthenticated: false });
        console.log('No user is signed in');
      }
    });
  };

  render() {
    const { userAuthenticated } = this.state;
    return (
      <>
        <BrowserRouter>
          <Navbar auth={userAuthenticated} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => <HomePage {...props} auth={userAuthenticated} />}
            />
            <Route
              path="/saved-recipes"
              render={props => (
                <SavedRecipesPage {...props} auth={userAuthenticated} />
              )}
            />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/logout" component={LogoutPage} />
            <Route path="/recipe/:id" component={Recipe} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </>
    );
  }
}

export default App;
