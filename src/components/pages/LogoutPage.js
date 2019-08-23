import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Modal } from 'semantic-ui-react';
import firebase from '../../firebase/config';
import 'firebase/auth';

class LogoutPage extends Component {
  state = { open: true };

  showModal = () => {
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  logOut = async () => {
    await firebase.auth().signOut();
    await this.props.history.push('/');
  };

  stayLoggedIn = () => {
    this.props.history.push('/saved-recipes');
  };

  componentDidMount() {
    this.showModal();
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <Modal size="small" open={open} onClose={this.closeModal}>
          <Modal.Header>Log out</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to log out of your account?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button positive color="red" onClick={this.logOut}>
              Yes
            </Button>
            <Button onClick={this.stayLoggedIn} negative>
              No
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default withRouter(LogoutPage);
