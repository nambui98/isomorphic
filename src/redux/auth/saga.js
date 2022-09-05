import { all, takeEvery, put, fork } from "redux-saga/effects";
import { createBrowserHistory } from "history";
import authRequest from "../../service/auth";

import { getToken, clearToken } from "@iso/lib/helpers/utility";
import actions from "./actions";

import { createBlankAsyncSagaRequest } from "../common";

const history = createBrowserHistory();

function* handleRequestLogin({ payload, type }) {
  return yield createBlankAsyncSagaRequest({
    api: authRequest.login,
  })({
    type,
    payload,
  });
}

export function* loginRequest() {
  yield takeEvery("LOGIN_REQUEST", handleRequestLogin);
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* ({ payload }) {
    yield localStorage.setItem("accessToken", payload?.data?.accessToken);
    yield localStorage.setItem("permissions", payload?.data?.permissions[0]);
  });
}

function* requestResetPassword(action) {
  console.log("asdifhuef", action);

  return yield createBlankAsyncSagaRequest({
    // api,
    // success,
    // failure
  })(action);
}

export function* resetPasswordRequest() {
  yield takeEvery(actions.RESET_PASSWORD, requestResetPassword);
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    yield clearToken();
    history.push("/");
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    const token = getToken().get("accessToken");
    const permissions = getToken().get("permissions");

    const data = { accessToken: token, permissions: [permissions] };

    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        payload: {
          data,
          // profile: "Profile",
        },
      });
    }
  });
}

function* handleRequestLogin2FA(action) {
  return yield createBlankAsyncSagaRequest({
    api: authRequest.login2FA,
  })(action);
}

export function* login2FA() {
  yield takeEvery("LOGIN_2FA", handleRequestLogin2FA);
}

function* handleRequestLoginEnable2FA(action) {
  return yield createBlankAsyncSagaRequest({
    api: authRequest.loginEnable2FARequest,
  })(action);
}
export function* loginEnable2FA() {
  yield takeEvery(actions.LOGIN_ENABLE_2FA, handleRequestLoginEnable2FA);
}

export default function* rootSaga() {
  yield all([fork(checkAuthorization), fork(loginRequest), fork(loginSuccess), fork(logout), fork(resetPasswordRequest), fork(login2FA), fork(loginEnable2FA)]);
}
