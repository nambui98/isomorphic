import { all, fork, takeLatest } from "redux-saga/effects";
import { openNotificationWithIcon } from "@iso/containers/Feedback/Notification/Notification";
import accountRequest from "../../service/account";

import actions from "./actions";

import { createBlankAsyncSagaRequest } from "../common";

function* handleAddAccount(action) {
  return yield createBlankAsyncSagaRequest({
    api: accountRequest.addAccount,
    success: [(res) => openNotificationWithIcon("success", "Success", "Add Account Success")],
    failure: [(res) => openNotificationWithIcon("error", "Error", "Errors: account is exist")],
  })(action);
}

export function* addAccountRequest() {
  yield takeLatest(actions.ADD_ACCOUNT, handleAddAccount);
}

export default function* accountSaga() {
  yield all([fork(addAccountRequest)]);
}
