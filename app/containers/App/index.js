/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import auth0Client from '../Auth';
import HomePage from '../HomePage';
import Header from '../../components/Header';
import GlobalStyle from '../../global-styles';
import Callback from '../Callback';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#b9f6ca',
    },
    secondary: purple,
  },
});

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

class App extends Component {
  async componentDidMount() {
    if (this.props.location.pathname === '/callback') return;
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error === 'login_required') return;
      console.log(err.error);
    }
  }

  render() {
    return (
      <AppWrapper>
        <MuiThemeProvider theme={theme}>
          <Helmet titleTemplate="BEER FINDER" defaultTitle="Beer finder LTD">
            <meta name="description" content="A beer finder service" />
          </Helmet>
          <Header />

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/callback" component={Callback} />
            {/* <Route path="/features" component={FeaturePage} /> */}
            {/* <Route path="" component={NotFoundPage} /> */}
          </Switch>
          {/* <Footer /> */}
          <GlobalStyle />
        </MuiThemeProvider>
      </AppWrapper>
    );
  }
}

export default withRouter(App);
