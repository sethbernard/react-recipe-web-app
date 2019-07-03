import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import SavedRecipesPage from './components/SavedRecipesPage';
import LoginPage from './components/LoginPage';
import LogoutPage from './components/LogoutPage';
import RecipePage from './components/RecipePage';
import Footer from './components/Footer';

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
            <Route path="/logout" component={LogoutPage} />
            <Route path="/recipe/:id" component={RecipePage} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
