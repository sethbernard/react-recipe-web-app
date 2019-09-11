import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Modal } from 'semantic-ui-react';
import { auth } from '../../firebase/config';

class LogoutPage extends Component {
  state = { open: true };

  showModal = () => {
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  logOut = () => {
    auth.signOut();
    this.props.history.push('/');
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
      <div style={{ height: '75vh' }}>
        <Modal size="small" open={open} onClose={this.closeModal}>
          <Modal.Header>Log out</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to log out of your account?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button positive onClick={() => this.logOut()}>
              Yes
            </Button>
            <Link to="/saved-recipes">
              <Button negative>No</Button>
            </Link>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default withRouter(LogoutPage);
