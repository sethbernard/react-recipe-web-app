import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'semantic-ui-react';

const DeleteAccountModal = props => {
  return (
    <div
      style={{
        alignContent: 'flex-end',
        margin: '1rem 0'
      }}
    >
      <Button onClick={() => props.onClick()} size="mini">
        Delete Your Account
      </Button>
      <Modal open={props.open} onClose={props.onClose} size="small">
        <Modal.Header>Delete Account</Modal.Header>
        <Modal.Content>
          <p>
            Are you sure you want to delete your account and all of your
            recipes?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={() => props.delete()}>
            Yes
          </Button>
          <Link to={props.to}>
            <Button onClick={props.onClose} negative>
              No
            </Button>
          </Link>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default DeleteAccountModal;
