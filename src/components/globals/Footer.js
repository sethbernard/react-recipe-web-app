import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../App.css';
import DeleteAccountModal from '../modals/DeleteAccountModal';
import { auth, db } from '../../firebase/config';

class Footer extends Component {
  state = { open: false };

  showModal = () => {
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  // Delete all user recipe documents along with the user
  deleteUserandRecipes = async () => {
    try {
      const user = auth.currentUser;
      const allUserDocsQuery = await db
        .collection('userrecipes')
        .where('userId', '==', user.uid);

      allUserDocsQuery.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
        });
      });

      await user.delete();
      await this.closeModal();
      await this.props.history.push('/');
      console.log('User and recipes deleted');
    } catch (error) {
      console.error(error);
    }
  };

  handleClassName = () => {
    const { pathname } = this.props.location;

    if (pathname === '/' || pathname === 'recipe/:id') {
      return '';
    } else {
      return 'stickyFooter';
    }
  };

  render() {
    const { open } = this.state;
    return (
      <footer
        style={{
          marginTop: '4rem',
          padding: '1rem',
          borderTop: '2px solid rgba(34,36,38,.15)',
          textAlign: 'center',
          backgroundColor: '#fff'
        }}
        className={this.handleClassName()}
      >
        <p>
          Developed by
          <a
            href="https://github.com/sethbernard"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            Seth Bernard
          </a>
        </p>
        <div id="edamam-badge" data-color="white" />

        <DeleteAccountModal
          onClick={this.showModal}
          delete={this.deleteUserandRecipes}
          to={'/'}
          open={open}
          onClose={this.closeModal}
        />
      </footer>
    );
  }
}

export default withRouter(Footer);
