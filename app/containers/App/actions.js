/*
 *
 * App actions
 *
 */

import { USER_STATE } from './constants';

export function getAccessToken() {
  return {
    type: USER_STATE.GET_ACCESS_TOKEN,
  };
}

export function accessTokenAuthenticated(accessToken) {
  return {
    type: USER_STATE.ACCESS_TOKEN_AUTHENTICATED,
    accessToken,
  };
}

export function accessTokenInvalid() {
  return {
    type: USER_STATE.ACCESS_TOKEN_INVALID,
  };
}

export function getUserProfile(accessToken) {
  return {
    type: USER_STATE.GET_USER_PROFILE,
    accessToken,
  };
}

export function getUserProfileSuccess(user) {
  return {
    type: USER_STATE.GET_USER_PROFILE_SUCCESS,
    user,
  };
}
