import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import firebase from '../../firebase/config';
import 'firebase/auth';

class LogoutPage extends Component {
  authStateChanged = () => {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log(firebaseUser);
      } else {
        console.log('NOT LOGGED IN');
      }
    });
  };

  logOut = () => {
    firebase.auth().signOut();
  };

  componentDidMount() {
    this.authStateChanged();
  }

  render() {
    return (
      <div>
        <h1>Logout Page!</h1>
        <Button color="red" size="large" onClick={this.logOut}>
          Log Out
        </Button>
      </div>
    );
  }
}

export default LogoutPage;
