import { createSelector } from 'reselect';

/**
 * Other specific selectors
 */
const selectRouter = state => state.router;
const selectGlobal = state => state.global;

/**
 * Default selector used by App
 */
const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.user,
  );

export { makeSelectLocation, makeSelectUser };
