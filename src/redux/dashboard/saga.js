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

export default function* rootSaga() {
  yield all([fork(getHeeInfo)]);
}
