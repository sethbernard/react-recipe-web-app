import React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import 'firebase/auth';

const Navbar = ({ auth }) => {
  return (
    <Menu pointing secondary>
      <Menu.Item name="home" as={NavLink} exact to="/" />
      <Menu.Item name="saved-recipes" as={NavLink} to="/saved-recipes" />
      <Menu.Menu position="right">
        {auth === false ? (
          <>
            <Menu.Item name="signup" as={NavLink} to="/signup" />
            <Menu.Item name="login" as={NavLink} to="/login" />
          </>
        ) : (
          <Menu.Item name="logout" as={NavLink} to="/logout" />
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
