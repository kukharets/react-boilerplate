import React from 'react';
import { FormattedMessage } from 'react-intl';
import PrimarySearchAppBar from './AppBar';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    return <PrimarySearchAppBar />;
  }
}

export default Header;
