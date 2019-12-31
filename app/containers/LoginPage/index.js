/**
 *
 * LoginPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles, Grid, Paper, Typography, Divider, TextField, Button } from '@material-ui/core';
import clsx from 'clsx';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';

import appMessages from '../App/messages';

import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Logo from '../../images/logo.png';

const useStyles = makeStyles(theme => ({
  full: {
    width: '100vw',
    height: '100vh',
  },
  wrapper: {
    maxWidth: '300px',
  },
  loginForm: {
    padding: 12,
  },
  appName: {
    color: theme.palette.primary[500],
  },
  logo: {
    width: 50,
    height: 50,
  },
  marginBottom: {
    marginBottom: theme.spacing(1),
  },
  formWidth: {
    width: '85%',
  },
  loginButton: {
    minWidth: 70,
  },
}));

export function LoginPage() {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });
  const classes = useStyles();

  return (
    <div className={classes.full}>
      <Helmet>
        <title>Brahma | Login</title>
        <meta name="description" content="Brahma login page" />
      </Helmet>
      <Grid container alignItems="center" justify="center" className={classes.full}>
        <Paper>
          <Grid container item className={clsx(classes.wrapper, classes.loginForm)} direction="column">
            <Grid container item justify="center" alignItems="center" className={classes.marginBottom}>
              <img src={Logo} alt="Brahma Logo" className={classes.logo} />
            </Grid>

            <Grid container item justify="center">
              <Typography variant="h6" style={{ marginRight: 6 }}>
                <FormattedMessage {...messages.welcomeTo} />
              </Typography>
              <Typography variant="h6" color="primary">
                <FormattedMessage {...appMessages.appName} />
              </Typography>
            </Grid>

            <Divider className={classes.marginBottom} />

            <Grid container item justify="center">
              <TextField
                label="Username"
                type="text"
                variant="standard"
                className={clsx(classes.formWidth, classes.marginBottom)}
              />
              <TextField
                label="Password"
                type="password"
                variant="standard"
                className={clsx(classes.formWidth, classes.marginBottom)}
              />
            </Grid>

            <Grid container item justify="center" alignItems="center" direction="column">
              <Grid container item justify="flex-start" className={clsx(classes.marginBottom, classes.formWidth)}>
                <Typography variant="body1" color="secondary">
                  <FormattedMessage {...messages.forgotPassword} />
                </Typography>
              </Grid>
              <Grid container item justify="flex-end" className={classes.formWidth}>
                <Button variant="contained" color="primary" className={classes.loginButton}>
                  Login
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);
