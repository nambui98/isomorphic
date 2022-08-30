const actions = {
  ADD_ACCOUNT: "ADD_ACCOUNT",
  ADD_ACCOUNT_SUCCESS: "ADD_ACCOUNT_SUCCESS",
  ADD_ACCOUNT_ERROR: "ADD_ACCOUNT_ERROR",
  ADD_ACCOUNT_PENDING: "ADD_ACCOUNT_PENDING",
  addAccountAction: (payload) => ({
    type: actions.ADD_ACCOUNT,
    payload,
  }),
};
export default actions;
