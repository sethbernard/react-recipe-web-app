import React from 'react';
import { Link } from 'react-router-dom';
import SignUpPage from './SignUpPage';

const LoginPage = () => {
  return (
    <div>
      <h1>Yo, from the Login Page!</h1>
      <p>
        Don't have an account yet? Sign up <Link to="/signup">here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
