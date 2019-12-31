/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import { USER_STATE } from './constants';

export const initialState = {
  user: {
    info: {},
    accessToken: null,
    state: USER_STATE.INITIAL,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case USER_STATE.INITIAL:
        draft.user.state = action.type;
        break;
      case USER_STATE.ACCESS_TOKEN_AUTHENTICATED:
        draft.user.state = action.type;
        draft.user.accessToken = action.accessToken;
        break;
      case USER_STATE.ACCESS_TOKEN_INVALID:
        draft.user.state = action.type;
        draft.user.accessToken = null;
        draft.user.info = {};
        break;
      case USER_STATE.GET_USER_PROFILE:
        draft.user.state = action.type;
        draft.user.accessToken = action.accessToken;
        break;
      case USER_STATE.GET_USER_PROFILE_SUCCESS:
        draft.user.state = action.type;
        draft.user.info = action.user.user;
        break;
    }
  });

export default appReducer;
