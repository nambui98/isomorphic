import { all, fork, takeLatest } from "redux-saga/effects";
import groupRequest from "../../service/groupPermission";

import actions from "./actions";

import { makeActionNotification, createBlankAsyncSagaRequest } from "../common";

function* handleGetListGroup(action) {
  return yield createBlankAsyncSagaRequest({
    api: groupRequest.getListGroupPermissions,
    failure: [(res) => makeActionNotification({ status: "error", title: "Error", description: res?.data?.meta.error_message })],
  })(action);
}

function* getListGroupPermissions() {
  yield takeLatest(actions.GET_LIST_GROUP, handleGetListGroup);
}

function* handleUpdateGroup(action) {
  return yield createBlankAsyncSagaRequest({
    api: groupRequest.updateGroupPermissions,
    success: [() => makeActionNotification({ status: "success", title: "Success", description: "Update success" })],
    failure: [(res) => makeActionNotification({ status: "error", title: "Error", description: res?.data?.meta.error_message })],
  })(action);
}

function* updateGroupPermissions() {
  yield takeLatest(actions.UPDATE_GROUP, handleUpdateGroup);
}

function* handleAddNewGroup(action) {
  return yield createBlankAsyncSagaRequest({
    api: groupRequest.addNewGroup,
    success: [() => makeActionNotification({ status: "success", title: "Success", description: "Add success" })],
    failure: [(res) => makeActionNotification({ status: "error", title: "Error", description: res?.data?.meta.error_message })],
  })(action);
}
function* addNewGroup() {
  yield takeLatest(actions.ADD_GROUP, handleAddNewGroup);
}

function* handleDeleteGroup(action) {
  return yield createBlankAsyncSagaRequest({
    api: groupRequest.deleteGroup,
    success: [() => makeActionNotification({ status: "success", title: "Success", description: "Delete success" })],
    failure: [(res) => makeActionNotification({ status: "error", title: "Error", description: res?.data?.meta.error_message })],
  })(action);
}

function* deleteGroup() {
  yield takeLatest(actions.DELETE_GROUP_REQUEST, handleDeleteGroup);
}

function* handleGetListPermissions(action) {
  return yield createBlankAsyncSagaRequest({
    api: groupRequest.getListPermissions,
    // success: [() => makeActionNotification({ status: "success", title: "Success", description: "Delete success" })],
    failure: [(res) => makeActionNotification({ status: "error", title: "Error", description: res?.data?.meta.error_message })],
  })(action);
}

function* listPermissionByGroup() {
  yield takeLatest(actions.LIST_PERMISSION_BY_GROUP, handleGetListPermissions);
}

export default function* groupPermissionSaga() {
  yield all([fork(getListGroupPermissions), fork(updateGroupPermissions), fork(addNewGroup), fork(deleteGroup), fork(listPermissionByGroup)]);
}
