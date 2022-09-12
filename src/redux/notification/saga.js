import { all, fork, takeLatest } from "redux-saga/effects";
import { openNotificationWithIcon } from "@iso/containers/Feedback/Notification/Notification";
import notiRequest from "../../service/noti";

import actions from "./actions";

import { createBlankAsyncSagaRequest } from "../common";

function* handleGetListNotifications(action) {
  console.log("handleGetListNotifications", action);

  return yield createBlankAsyncSagaRequest({
    api: notiRequest.getListNotifications,
    // success: [(res) => openNotificationWithIcon("success", "Success", "Add Account Success")],
    // failure: [(res) => openNotificationWithIcon("error", "Error", "Errors: account is exist")],
  })(action);
}

function* getListNotificationsRequest() {
  yield takeLatest(actions.GET_NOTIFICATIONS, handleGetListNotifications);
}

function* handleGetNoti(action) {
  return yield createBlankAsyncSagaRequest({
    api: notiRequest.getNotification,
  })(action);
}

function* getNotiRequest() {
  yield takeLatest(actions.GET_NOTI, handleGetNoti);
}

function* handleSaveNotification(action) {
  console.log("ioewhfuhsadf", action);
  return yield createBlankAsyncSagaRequest({
    api: notiRequest.saveNotification,
    success: [(res) => openNotificationWithIcon("success", "Success", "Update Success")],
    failure: [(res) => openNotificationWithIcon("error", "Error", res?.meta.error_message)],
  })(action);
}

function* saveNotiRequest() {
  yield takeLatest(actions.SAVE_NOTIFICATION, handleSaveNotification);
}

function* handleSendNotification(action) {
  return yield createBlankAsyncSagaRequest({
    api: notiRequest.sendNoti,
    success: [(res) => openNotificationWithIcon("success", "Success", "Send Success")],
  })(action);
}

function* sendNotiRequest() {
  yield takeLatest(actions.SEND_NOTIFICATION, handleSendNotification);
}

function* handleDraftNotification(action) {
  return yield createBlankAsyncSagaRequest({
    api: notiRequest.saveNotification,
    success: [(res) => openNotificationWithIcon("success", "Success", "Save Success")],
  })(action);
}

function* draftNotiRequest() {
  yield takeLatest(actions.DRAFT_NOTIFICATION, handleDraftNotification);
}

export default function* notiSaga() {
  yield all([fork(getListNotificationsRequest), fork(getNotiRequest), fork(saveNotiRequest), fork(sendNotiRequest), fork(draftNotiRequest)]);
}
