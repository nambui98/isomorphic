import { all, takeEvery, put, fork } from "redux-saga/effects";
import { createBrowserHistory } from "history";
import cdnRequest from "../../service/cdn";
import { openNotificationWithIcon } from "@iso/containers/Feedback/Notification/Notification";
import { getToken, clearToken } from "@iso/lib/helpers/utility";
import actions from "./actions";

import { createBlankAsyncSagaRequest } from "../common";

const history = createBrowserHistory();

function* handleRequestGetListCdn(action) {
  return yield createBlankAsyncSagaRequest({
    api: cdnRequest.getListCdn,
  })(action);
}

function* getListCdnRequest() {
  yield takeEvery(actions.GET_LIST_CDN, handleRequestGetListCdn);
}

function* handleViewContentVersion(action) {
  return yield createBlankAsyncSagaRequest({
    api: cdnRequest.viewContentVersion,
  })(action);
}

function* viewContentVersion() {
  yield takeEvery(actions.VIEW_VERSION_CONTENT, handleViewContentVersion);
}

function* handleEditViewVersion(action) {
  return yield createBlankAsyncSagaRequest({
    api: cdnRequest.editVersion,
    success: [(res) => openNotificationWithIcon("success", "Success", "Success")],
    failure: [(res) => openNotificationWithIcon("error", "Error", res.data?.meta.error_message)],
  })(action);
}

function* editViewVersion() {
  yield takeEvery(actions.EDIT_VIEW_VERSION, handleEditViewVersion);
}

export default function* rootSaga() {
  yield all([fork(getListCdnRequest), fork(viewContentVersion), fork(editViewVersion)]);
}
