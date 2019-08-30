import React, { Component } from 'react';
import { Grid, Button, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NotAuthedModal extends Component {
  state = { open: true };

  showModal = () => {
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  componentDidMount = () => {
    this.showModal();
  };

  render() {
    const { open } = this.state;
    return (
      <Grid
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          height: '75vh'
        }}
      >
        <Modal
          size="tiny"
          open={open}
          onClose={this.closeModal}
          closeIcon={true}
        >
          <Modal.Header as="h1">
            Please login or signup to view this page!
          </Modal.Header>

          <Modal.Actions>
            <Link to="/login">
              <Button color="blue" size="large" style={{ marginRight: '1rem' }}>
                Log In
              </Button>
            </Link>

            <Link to="/signup">
              <Button color="blue" size="large">
                Sign Up
              </Button>
            </Link>
          </Modal.Actions>
        </Modal>
      </Grid>
    );
  }
}

export default NotAuthedModal;
