import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/pages/HomePage';
import SavedRecipesPage from './components/pages/SavedRecipesPage';
import LoginPage from './components/pages/LoginPage';
import SignUpPage from './components/pages/SignUpPage';
import LogoutPage from './components/pages/LogoutPage';
import Recipe from './components/Recipe';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/saved-recipes" component={SavedRecipesPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/logout" component={LogoutPage} />
            <Route path="/recipe/:id" component={Recipe} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
