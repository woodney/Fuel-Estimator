import * as actions from "./actions";
import createReducer from "../createReducer";
import Immutable from "immutable";

const reducer = {};
const initialState = Immutable.fromJS({
  loading: false,
  received: false,
  authenticated: false,
  token: "",
  user: {},
  error: false,
  address: {},
  history: {}
});

reducer[actions.USER_AUTHENTICATED] = (state, event) => {
  return state.set("user", event.user).set("token", event.token);
};

reducer[actions.REGISTER_USER] = (state, event) => {
  return state.set("user", Immutable.fromJS(event.user));
};

reducer[actions.ADD_USER_ADDRESS] = (state, event) => {
  return state.set("address", Immutable.fromJS(event.address));
};

reducer[actions.AUTHENTICATE_USER_START] = (state, event) => {
  return state.set("loading", true).set("received", false);
};

reducer[actions.AUTHENTICATE_USER_SUCCESS] = (state, event) => {
  return state.set("authenticated", event.authenticated);
};

reducer[actions.AUTHENTICATE_USER_FAILED] = (state, event) => {
  return state.set("error", event.error).set("received", false);
};

reducer[actions.SET_USER_HISTORY_DATA] = (state, event) => {
  return state.set("history", Immutable.fromJS(event.history));
};

export default createReducer(initialState, reducer);
