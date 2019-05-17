import { takeEvery, put, select, call } from "redux-saga/effects";
import * as actions from "./actions";
import { getUser } from "./selectors";
import axios from "axios";

const url = "http://localhost:5000";

export const makeUserCall = async username => {
  const data = await axios.get(url + "/api/clients");
  const response = await data.data;
  return response;
};

export const makeUserHistoryCall = async username => {
  const data = await axios.get(url + "/api/history");
  const response = await data.data;
  return response;
};

function* getUserDataRequest(action) {
  const { username } = action;
  try {
    const data = yield call(makeUserCall, username);
    console.log(data);
  } catch (e) {}
}

function* getUserHistoryRequest(action) {
  const { username } = action;
  try {
    const data = yield call(makeUserHistoryCall, username);
    yield put({ type: actions.SET_USER_HISTORY_DATA, history: data });
  } catch (e) {}
}

function* verifyUser(action) {
  const { username, password } = action;
  try {
    const user = yield select(getUser);
    let authenticated = false;
    const realUsername = user && user.get("username");
    const realPassword = user && user.get("password");
    if (username === realUsername && password === realPassword) {
      authenticated = true;
    }
    yield put({ type: actions.AUTHENTICATE_USER_SUCCESS, authenticated });
  } catch (err) {
    yield put({ type: actions.AUTHENTICATE_USER_FAILED, error: err });
  }
}

function* verify() {
  yield takeEvery(actions.AUTHENTICATE_USER, verifyUser);
}

function* getUserData() {
  yield takeEvery(actions.GET_USER_DATA, getUserDataRequest);
}

function* getHistoryData() {
  yield takeEvery(actions.GET_USER_HISTORY_DATA, getUserHistoryRequest);
}

export default [verify, getUserData, getHistoryData];
