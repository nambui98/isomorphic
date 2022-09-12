import { all, takeEvery, fork } from "redux-saga/effects";
import roleRequest from "../../service/role";
import { openNotificationWithIcon } from "@iso/containers/Feedback/Notification/Notification";
import contactActions from "@iso/redux/contacts/actions";
// import { useSelector, useDispatch } from "react-redux";
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

function* handleEditRole(action) {
  return yield createBlankAsyncSagaRequest({
    api: roleRequest.editRole,
    success: [contactActions.viewChange(false), (res) => openNotificationWithIcon("success", "Success", "Edit role success")],
    failure: [(res) => openNotificationWithIcon("error", "Error", res?.data?.meta.error_message)],
  })(action);
}

export function* editRole() {
  yield takeEvery(actions.EDIT_ROLE, handleEditRole);
}

function* handleAddNewRole(action) {
  return yield createBlankAsyncSagaRequest({
    api: roleRequest.addNewRole,
    success: [() => openNotificationWithIcon("success", "Success", "Add role success")],
    failure: [(res) => openNotificationWithIcon("error", "Error", res?.data?.meta.error_message)],
  })(action);
}

export function* addNewRole() {
  yield takeEvery(actions.ADD_NEW_ROLE, handleAddNewRole);
}

export default function* roleSaga() {
  yield all([fork(getAllRole), fork(editRole), fork(addNewRole)]);
}
