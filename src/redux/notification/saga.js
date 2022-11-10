import { all, fork, takeLatest } from "redux-saga/effects";
import { openNotificationWithIcon } from "@iso/containers/Feedback/Notification/Notification";
import notiRequest from "../../service/noti";
import { makeActionNotification } from "../common";

import actions from "./actions";

import { createBlankAsyncSagaRequest } from "../common";

function* handleGetListNotifications(action) {
  return yield createBlankAsyncSagaRequest({
    api: notiRequest.getListNotifications,
  })(action);
}

function* getListNotificationsRequest() {
  yield takeLatest(actions.GET_NOTIFICATIONS, handleGetListNotifications);
}

function* handleGetNoti(action) {
  return yield createBlankAsyncSagaRequest({
    api: notiRequest.getNotification,
    failure: [(res) => makeActionNotification({ status: "error", title: "Error", description: res?.data?.meta.error_message })],
  })(action);
}

function* getNotiRequest() {
  yield takeLatest(actions.GET_NOTI, handleGetNoti);
}

function* handleSaveNotification(action) {
  return yield createBlankAsyncSagaRequest({
    api: notiRequest.saveNotification,
    success: [(res) => makeActionNotification({ status: "success", title: "Success", description: "Update Success" })],
    failure: [(res) => makeActionNotification({ status: "error", title: "Error", description: res?.data?.meta.error_message })],
  })(action);
}

function* saveNotiRequest() {
  yield takeLatest(actions.SAVE_NOTIFICATION, handleSaveNotification);
}

function* handleSendNotification(action) {
  return yield createBlankAsyncSagaRequest({
    api: notiRequest.sendNoti,
    success: [() => makeActionNotification({ status: "success", title: "Success", description: "Send Success" })],
    failure: [(res) => makeActionNotification({ status: "error", title: "Error", description: res?.data?.meta.error_message })],
  })(action);
}

function* sendNotiRequest() {
  yield takeLatest(actions.SEND_NOTIFICATION, handleSendNotification);
}

function* handleDraftNotification(action) {
  return yield createBlankAsyncSagaRequest({
    api: notiRequest.saveNotification,
    success: [(res) => makeActionNotification({ status: "success", title: "Success", description: "Save Success" })],
  })(action);
}

function* draftNotiRequest() {
  yield takeLatest(actions.DRAFT_NOTIFICATION, handleDraftNotification);
}

export default function* notiSaga() {
  yield all([fork(getListNotificationsRequest), fork(getNotiRequest), fork(saveNotiRequest), fork(sendNotiRequest), fork(draftNotiRequest)]);
}
