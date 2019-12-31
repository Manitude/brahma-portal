/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { push } from 'connected-react-router';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import { blue, orange } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';

import HomePage from '../HomePage/Loadable';
import LoginPage from '../LoginPage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import { useInjectSaga } from '../../utils/injectSaga';

import saga from './saga';
import { USER_STATE } from './constants';
import { getAccessToken } from './actions';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange,
  },
});

export default function App() {
  useInjectSaga({ key: 'app', saga });

  const { user } = useSelector(state => state.global);
  const { location } = useSelector(state => state.router);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.state === USER_STATE.INITIAL) {
      dispatch(getAccessToken());
    }

    if (user.state === USER_STATE.ACCESS_TOKEN_INVALID && location.pathname !== '/login') {
      dispatch(push('/login'));
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </ThemeProvider>
  );
}
