import { all, takeEvery, fork } from "redux-saga/effects";
import roleRequest from "../../service/role";
import { openNotificationWithIcon } from "@iso/containers/Feedback/Notification/Notification";
import contactActions from "@iso/redux/contacts/actions";
// import { useSelector, useDispatch } from "react-redux";
import actions from "./actions";
import { makeActionNotification } from "../common";

import { createBlankAsyncSagaRequest } from "../common";

function* handleGetAllRole(action) {
  return yield createBlankAsyncSagaRequest({
    api: roleRequest.getAllRole,
  })(action);
}

export function* getAllRole() {
  yield takeEvery(actions.GET_ALL_ROLE, handleGetAllRole);
}

function* handleEditRole(action) {
  return yield createBlankAsyncSagaRequest({
    api: roleRequest.editRole,
    success: [contactActions.viewChange(false), (res) => makeActionNotification({ status: "success", title: "Success", description: "Edit role success" })],
    failure: [(res) => makeActionNotification({ status: "error", title: "Error", description: res?.data?.meta.error_message })],
  })(action);
}

export function* editRole() {
  yield takeEvery(actions.EDIT_ROLE, handleEditRole);
}

function* handleAddNewRole(action) {
  return yield createBlankAsyncSagaRequest({
    api: roleRequest.addNewRole,
    // Add role success
    success: [() => makeActionNotification({ status: "success", title: "Success", description: "Add role success" })],
    failure: [(res) => makeActionNotification({ status: "error", title: "Error", description: res?.data?.meta.error_message })],
  })(action);
}

export function* addNewRole() {
  yield takeEvery(actions.ADD_NEW_ROLE, handleAddNewRole);
}

function* handleGetListGroupByRole(action) {
  return yield createBlankAsyncSagaRequest({
    api: roleRequest.getListGroupByRole,
    // Add role success
    // success: [() => makeActionNotification({ status: "success", title: "Success", description: "Add role success" })],
    failure: [(res) => makeActionNotification({ status: "error", title: "Error", description: res?.data?.meta.error_message })],
  })(action);
}

export function* getListGroup() {
  yield takeEvery(actions.GET_LIST_GROUP_BY_ROLE, handleGetListGroupByRole);
}

export default function* roleSaga() {
  yield all([fork(getAllRole), fork(editRole), fork(addNewRole), fork(getListGroup)]);
}
