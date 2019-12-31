import { takeLatest, put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as url from 'url';

import Helpers from '../../utils/helper';
import { USER_STATE } from './constants';
import { accessTokenAuthenticated, accessTokenInvalid, getUserProfile, getUserProfileSuccess } from './actions';

export function* getAccessTokenSaga() {
  const { query } = url.parse(window.location.href, true);
  const retrievedToken = query.token ? query.token : Helpers.getAccessToken();

  if (!retrievedToken || !Helpers.isTokenValid(retrievedToken)) {
    return yield put(accessTokenInvalid());
  }

  Helpers.setSession(retrievedToken);
  yield put(getUserProfile(retrievedToken));
  return null;
}

export function* fetchUserProfileSaga() {
  try {
    const response = yield call(Helpers.axios.get, '/profile/me');
    yield put(getUserProfileSuccess(response.data));
    yield put(accessTokenAuthenticated(Helpers.getAccessToken()));
    yield put(push('/'));
  } catch (e) {
    // TODO :error-handling:
    console.log(e);
  }
}

// Individual exports for testing
export default function* appSaga() {
  Helpers.axios.interceptors.response.use(
    response => response,
    err =>
      new Promise(function* intercept401() {
        // eslint-disable-next-line no-underscore-dangle
        if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized response, logout the user
          yield put(accessTokenInvalid());
          Helpers.setSession(null);
        }
        throw err;
      }),
  );

  // See example in containers/HomePage/saga.js
  yield takeLatest(USER_STATE.GET_ACCESS_TOKEN, getAccessTokenSaga);
  yield takeLatest(USER_STATE.GET_USER_PROFILE, fetchUserProfileSaga);
}
