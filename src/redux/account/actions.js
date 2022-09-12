const actions = {
  ADD_ACCOUNT: "ADD_ACCOUNT",
  ADD_ACCOUNT_SUCCESS: "ADD_ACCOUNT_SUCCESS",
  ADD_ACCOUNT_ERROR: "ADD_ACCOUNT_ERROR",
  ADD_ACCOUNT_PENDING: "ADD_ACCOUNT_PENDING",
  GET_LIST_ACCOUNT: "GET_LIST_ACCOUNT",
  GET_LIST_ACCOUNT_SUCCESS: "GET_LIST_ACCOUNT_SUCCESS",
  CHANGE_ID_ACCOUNT: "CHANGE_ID_ACCOUNT",
  ADD_ACCOUNT_ACTION: "ADD_ACCOUNT_ACTION",
  CHANGE_ACCOUNT: "CHANGE_ACCOUNT",
  CHANGE_VIEW: "CHANGE_VIEW",
  DISABLE_VIEW: "DISABLE_VIEW",
  RESET_PASSWORD_VIEW: "RESET_PASSWORD_VIEW",
  CHANGE_ROLE: "CHANGE_ROLE",
  ACTIVE_VIEW: "ACTIVE_VIEW",
  ACTIVE_ACCOUNT: "ACTIVE_ACCOUNT",
  DISABLE_ACCOUNT: "DISABLE_ACCOUNT",
  RESET_ACCOUNT: "RESET_ACCOUNT",
  CHANGE_ROLE_ACCOUNT: "CHANGE_ROLE_ACCOUNT",
  addAccountAction: (payload) => ({
    type: actions.ADD_ACCOUNT,
    payload,
  }),
  getListAccount: (payload) => ({
    type: actions.GET_LIST_ACCOUNT,
    payload,
  }),
  changeIdAccount: (payload) => ({
    type: actions.CHANGE_ID_ACCOUNT,
    payload,
  }),
  viewChange: (payload) => ({
    type: actions.CHANGE_VIEW,
    payload,
  }),
  activeAccount: (payload) => ({
    type: actions.ACTIVE_ACCOUNT,
    payload,
  }),
  disabledAccount: (payload) => ({
    type: actions.DISABLE_ACCOUNT,
    payload,
  }),
  resetAccount: (payload) => ({
    type: actions.RESET_ACCOUNT,
    payload,
  }),
  changeRoleAccount: (payload) => ({
    type: actions.CHANGE_ROLE_ACCOUNT,
    payload,
  }),
};
export default actions;
