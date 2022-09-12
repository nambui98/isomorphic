const actions = {
  GET_LIST_CDN: "GET_LIST_CDN",
  GET_LIST_CDN_SUCCESS: "GET_LIST_CDN_SUCCESS",
  CHANGE_VERSION_ID: "CHANGE_VERSION_ID",
  VIEW_VERSION_CONTENT: "VIEW_VERSION_CONTENT",
  VIEW_VERSION_CONTENT_SUCCESS: "VIEW_VERSION_CONTENT_SUCCESS",
  VIEW_CHANGE: "VIEW_CHANGE",
  EDIT_VIEW_VERSION: "EDIT_VIEW_VERSION",
  ADD_CDN_ACTION: "ADD_CDN_ACTION",
  EDIT_VIEW_VERSION_SUCCESS: "EDIT_VIEW_VERSION_SUCCESS",
  EDIT_VIEW_VERSION_PENDING: "EDIT_VIEW_VERSION_PENDING",

  addAccountAction: (payload) => ({
    type: actions.ADD_ACCOUNT,
    payload,
  }),
  changeVersionId: (payload) => ({
    type: actions.CHANGE_VERSION_ID,
    payload,
  }),
  viewVersionContent: (payload) => ({
    type: actions.VIEW_VERSION_CONTENT,
    payload,
  }),
  viewChange: (payload) => ({
    type: actions.VIEW_CHANGE,
    payload,
  }),
  editVersion: (payload) => ({
    type: actions.EDIT_VIEW_VERSION,
    payload,
  }),
};
export default actions;
