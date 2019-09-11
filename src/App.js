import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { auth } from './firebase/config';
import Navbar from './components/Navbar';
import HomePage from './components/pages/HomePage';
import SavedRecipesPage from './components/pages/SavedRecipesPage';
import LoginPage from './components/pages/LoginPage';
import SignUpPage from './components/pages/SignUpPage';
import LogoutPage from './components/pages/LogoutPage';
import Recipe from './components/Recipe';
import Footer from './components/Footer';

class App extends Component {
  _isMounted = false;

  state = {
    userAuthenticated: false
  };

  componentDidMount = () => {
    this._isMounted = true;
    // Check to see if a user is authenticated
    auth.onAuthStateChanged(user => {
      if (user && this._isMounted) {
        this.setState({ ...this.state, userAuthenticated: true });
      } else {
        this.setState({ userAuthenticated: false });
        console.log('No user is signed in');
      }
    });
  };

  componentWillUnmount = () => {
    this._isMounted = false;
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
              render={() => <HomePage auth={userAuthenticated} />}
            />
            <Route
              path="/saved-recipes"
              render={() => <SavedRecipesPage auth={userAuthenticated} />}
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
