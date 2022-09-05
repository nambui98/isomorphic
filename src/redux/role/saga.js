import { all, takeEvery, fork } from "redux-saga/effects";
import roleRequest from "../../service/role";

import actions from "./actions";

import { createBlankAsyncSagaRequest } from "../common";

function* handleGetAllRole(action) {
  return yield createBlankAsyncSagaRequest({
    api: roleRequest.getAllRole,
  })(action);
}

export function* getAllRole() {
  yield takeEvery(actions.GET_ALL_ROLE, handleGetAllRole);
}

export default function* roleSaga() {
  yield all([fork(getAllRole)]);
}
