import { all, fork, takeLatest } from "redux-saga/effects";
import { openNotificationWithIcon } from "@iso/containers/Feedback/Notification/Notification";
import accountRequest from "../../service/account";

import actions from "./actions";

import { createBlankAsyncSagaRequest } from "../common";

function* handleAddAccount(action) {
  return yield createBlankAsyncSagaRequest({
    api: accountRequest.addAccount,
    success: [(res) => openNotificationWithIcon("success", "Success", "Add Account Success")],
    failure: [(res) => openNotificationWithIcon("error", "Error", res.data?.meta.error_message)],
  })(action);
}

function* addAccountRequest() {
  yield takeLatest(actions.ADD_ACCOUNT, handleAddAccount);
}

function* handleGetListAccount(action) {
  return yield createBlankAsyncSagaRequest({
    api: accountRequest.getListAccount,
    // success: [(res) => openNotificationWithIcon("success", "Success", "Add Account Success")],
    failure: [(res) => openNotificationWithIcon("error", "Error", "Errors: get list account errors")],
  })(action);
}

function* getListAccountRequest() {
  yield takeLatest(actions.GET_LIST_ACCOUNT, handleGetListAccount);
}

function* handleActiveAccount(action) {
  return yield createBlankAsyncSagaRequest({
    api: accountRequest.activeAccount,
    success: [(res) => openNotificationWithIcon("success", "Success", "Active Account Success")],
    failure: [(res) => openNotificationWithIcon("error", "Error", res.data?.meta.error_message)],
  })(action);
}

function* activeAccountRequest() {
  yield takeLatest(actions.ACTIVE_ACCOUNT, handleActiveAccount);
}

function* handleDisableAccount(action) {
  return yield createBlankAsyncSagaRequest({
    api: accountRequest.disableAccount,
    success: [(res) => openNotificationWithIcon("success", "Success", "Disable Account Success")],
    failure: [(res) => openNotificationWithIcon("error", "Error", res.data?.meta.error_message)],
  })(action);
}

function* disableAccountRequest() {
  yield takeLatest(actions.DISABLE_ACCOUNT, handleDisableAccount);
}

function* handleResetAccount(action) {
  return yield createBlankAsyncSagaRequest({
    api: accountRequest.resetAccount,
    success: [(res) => openNotificationWithIcon("success", "Success", "Reset Account Success")],
    failure: [(res) => openNotificationWithIcon("error", "Error", res.data?.meta.error_message)],
  })(action);
}

function* resetAccountRequest() {
  yield takeLatest(actions.RESET_ACCOUNT, handleResetAccount);
}

function* handleChangeRoleAccount(action) {
  return yield createBlankAsyncSagaRequest({
    api: accountRequest.changeRoleAccount,
    success: [(res) => openNotificationWithIcon("success", "Success", "Change Role Account Success")],
    failure: [(res) => openNotificationWithIcon("error", "Error", res.data?.meta.error_message)],
  })(action);
}

function* changeRoleAccountRequest() {
  yield takeLatest(actions.CHANGE_ROLE_ACCOUNT, handleChangeRoleAccount);
}

export default function* accountSaga() {
  yield all([fork(addAccountRequest), fork(getListAccountRequest), fork(activeAccountRequest), fork(disableAccountRequest), fork(resetAccountRequest), fork(changeRoleAccountRequest)]);
}
