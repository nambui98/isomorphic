import { all, takeEvery, put, fork } from "redux-saga/effects";
import { createBrowserHistory } from "history";
import dashboardRequest from "../../service/dashboard";
import { openNotificationWithIcon } from "@iso/containers/Feedback/Notification/Notification";
import { getToken, clearToken } from "@iso/lib/helpers/utility";
import actions from "./actions";
import { makeActionNotification, createBlankAsyncSagaRequest } from "../common";

const history = createBrowserHistory();

function* handleGetHeeInfo(action) {
  return yield createBlankAsyncSagaRequest({
    api: dashboardRequest.getHee,
    // success: [() => makeActionNotification({ status: "success", title: "Success", description: "Edit version success" })],
    failure: [(res) => makeActionNotification({ status: "error", title: "Error", description: res?.data?.meta.error_message })],
  })(action);
}

function* getHeeInfo() {
  yield takeEvery(actions.GET_HEE, handleGetHeeInfo);
}

function* handleSendToSpendingToWallet(action) {
  return yield createBlankAsyncSagaRequest({
    api: dashboardRequest.getInfoSpendingToWallet,
    // success: [() => makeActionNotification({ status: "success", title: "Success", description: "Edit version success" })],
    failure: [(res) => makeActionNotification({ status: "error", title: "Error", description: res?.data?.meta.error_message })],
  })(action);
}

function* getDataSpendingToWallet() {
  yield takeEvery(actions.GET_INFO_SENDING_TO_WALLET, handleSendToSpendingToWallet);
}

function* handleGetShoeInfo(action) {
  return yield createBlankAsyncSagaRequest({
    api: dashboardRequest.getShoeInfoRequest,
    // success: [() => makeActionNotification({ status: "success", title: "Success", description: "Edit version success" })],
    failure: [(res) => makeActionNotification({ status: "error", title: "Error", description: res?.data?.meta.error_message })],
  })(action);
}

function* getShoeInfo() {
  yield takeEvery(actions.GET_SHOE_INFO, handleGetShoeInfo);
}

function* handleGetActivityInfo(action) {
  return yield createBlankAsyncSagaRequest({
    api: dashboardRequest.getActivityInfo,
    // success: [() => makeActionNotification({ status: "success", title: "Success", description: "Edit version success" })],
    failure: [(res) => makeActionNotification({ status: "error", title: "Error", description: res?.data?.meta.error_message })],
  })(action);
}

function* getActivityInfo() {
  yield takeEvery(actions.GET_ACTIVE_INFO, handleGetActivityInfo);
}

function* handleGetActivityFee(action) {
  return yield createBlankAsyncSagaRequest({
    api: dashboardRequest.getActivityFee,
    // success: [() => makeActionNotification({ status: "success", title: "Success", description: "Edit version success" })],
    failure: [(res) => makeActionNotification({ status: "error", title: "Error", description: res?.data?.meta.error_message })],
  })(action);
}

function* getActivityFee() {
  yield takeEvery(actions.GET_ACTIVE_FEE, handleGetActivityFee);
}

export default function* rootSaga() {
  yield all([fork(getHeeInfo), fork(getDataSpendingToWallet), fork(getShoeInfo), fork(getActivityInfo), fork(getActivityFee)]);
}
