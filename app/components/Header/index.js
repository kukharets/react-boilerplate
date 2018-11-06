import React from 'react';
import { FormattedMessage } from 'react-intl';
import PrimarySearchAppBar from './AppBar';
import NavBar from './NavBar';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return (
      <span>
        <PrimarySearchAppBar />
        <NavBar />
      </span>
    );
  }
}

export default Header;
