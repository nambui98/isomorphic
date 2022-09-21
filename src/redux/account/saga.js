import { all, fork, takeLatest } from "redux-saga/effects";
import accountRequest from "../../service/account";

import actions from "./actions";

import { makeActionNotification, createBlankAsyncSagaRequest } from "../common";

function* handleAddAccount(action) {
  return yield createBlankAsyncSagaRequest({
    api: accountRequest.addAccount,
    success: [() => makeActionNotification({ status: "success", title: "Success", description: "Add Account Success" })],
    failure: [(res) => makeActionNotification({ status: "error", title: "Error", description: res?.data?.meta.error_message })],
  })(action);
}

function* addAccountRequest() {
  yield takeLatest(actions.ADD_ACCOUNT, handleAddAccount);
}

function* handleGetListAccount(action) {
  return yield createBlankAsyncSagaRequest({
    api: accountRequest.getListAccount,
    failure: [(res) => makeActionNotification({ status: "error", title: "Error", description: res?.data?.meta.error_message })],
  })(action);
}

function* getListAccountRequest() {
  yield takeLatest(actions.GET_LIST_ACCOUNT, handleGetListAccount);
}

function* handleActiveAccount(action) {
  return yield createBlankAsyncSagaRequest({
    api: accountRequest.activeAccount,
    success: [() => makeActionNotification({ status: "success", title: "Success", description: "Active Account Success" })],
    failure: [(res) => makeActionNotification({ status: "error", title: "Error", description: res?.data?.meta.error_message })],
  })(action);
}

function* activeAccountRequest() {
  yield takeLatest(actions.ACTIVE_ACCOUNT, handleActiveAccount);
}

function* handleDisableAccount(action) {
  return yield createBlankAsyncSagaRequest({
    api: accountRequest.disableAccount,
    success: [() => makeActionNotification({ status: "success", title: "Success", description: "Disable Account Success" })],
    failure: [(res) => makeActionNotification({ status: "error", title: "Error", description: res?.data?.meta.error_message })],
  })(action);
}

function* disableAccountRequest() {
  yield takeLatest(actions.DISABLE_ACCOUNT, handleDisableAccount);
}

function* handleResetAccount(action) {
  return yield createBlankAsyncSagaRequest({
    api: accountRequest.resetAccount,
    success: [() => makeActionNotification({ status: "success", title: "Success", description: "Reset Account Success" })],
    failure: [(res) => makeActionNotification({ status: "error", title: "Error", description: res?.data?.meta.error_message })],
  })(action);
}

function* resetAccountRequest() {
  yield takeLatest(actions.RESET_ACCOUNT, handleResetAccount);
}

function* handleChangeRoleAccount(action) {
  return yield createBlankAsyncSagaRequest({
    api: accountRequest.changeRoleAccount,
    success: [() => makeActionNotification({ status: "success", title: "Success", description: "Change Role Account Success" })],
    failure: [(res) => makeActionNotification({ status: "error", title: "Error", description: res?.data?.meta.error_message })],
  })(action);
}

function* changeRoleAccountRequest() {
  yield takeLatest(actions.CHANGE_ROLE_ACCOUNT, handleChangeRoleAccount);
}

export default function* accountSaga() {
  yield all([fork(addAccountRequest), fork(getListAccountRequest), fork(activeAccountRequest), fork(disableAccountRequest), fork(resetAccountRequest), fork(changeRoleAccountRequest)]);
}
