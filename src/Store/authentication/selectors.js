import { createSelector } from "reselect";

const stateSelector = state => state.authentication;

export const getUser = createSelector(
  stateSelector,
  state => state.get("user")
);

export const getAuthenticated = createSelector(
  stateSelector,
  state => state.get("authenticated")
);

export const getUserAddress = createSelector(
  stateSelector,
  state => state.get("address")
);

export const getUserHistory = createSelector(
  stateSelector,
  state => state.get("history")
);
