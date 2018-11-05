/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import HomePage from '../HomePage';
import Header from '../../components/Header';
import GlobalStyle from '../../global-styles';

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

export default function App() {
  return (
    <AppWrapper>
      <MuiThemeProvider theme={theme}>
        <Helmet titleTemplate="BEER FINDER" defaultTitle="Beer finder LTD">
          <meta name="description" content="A beer finder service" />
        </Helmet>
        <Header />

        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route path="/features" component={FeaturePage} /> */}
          {/* <Route path="" component={NotFoundPage} /> */}
        </Switch>
        {/* <Footer /> */}
        <GlobalStyle />
      </MuiThemeProvider>
    </AppWrapper>
  );
}
