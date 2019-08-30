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
        console.log(user);
      } else {
        this.setState({ userAuthenticated: false });
        console.log('No user is signed in');
      }
    });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar auth={this.state.userAuthenticated} />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              path="/saved-recipes"
              render={props => (
                <SavedRecipesPage
                  {...props}
                  auth={this.state.userAuthenticated}
                />
              )}
            />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/logout" component={LogoutPage} />
            <Route path="/recipe/:id" component={Recipe} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
