const actions = {
  GET_HEE: "GET_HEE",
  GET_HEE_PENDING: "GET_HEE_PENDING",
  GET_HEE_SUCCESS: "GET_HEE_SUCCESS",
  GET_INFO_SENDING_TO_WALLET: "GET_INFO_SENDING_TO_WALLET",
  GET_INFO_SENDING_TO_WALLET_SUCCESS: "GET_INFO_SENDING_TO_WALLET_SUCCESS",
  GET_INFO_SENDING_TO_WALLET_ERROR: "GET_INFO_SENDING_TO_WALLET_ERROR",
  GET_SHOE_INFO: "GET_SHOE_INFO",
  GET_SHOE_INFO_SUCCESS: "GET_SHOE_INFO_SUCCESS",
  GET_ACTIVE_INFO: "GET_ACTIVE_INFO",
  GET_ACTIVE_INFO_SUCCESS: "GET_ACTIVE_INFO_SUCCESS",
  GET_ACTIVE_FEE: "GET_ACTIVE_FEE",
  GET_ACTIVE_FEE_SUCCESS: "GET_ACTIVE_FEE_SUCCESS",

  getHeeInfo: (payload) => ({
    type: actions.GET_HEE,
    payload,
  }),
  getInfoSpendingToWallet: (payload) => ({
    type: actions.GET_INFO_SENDING_TO_WALLET,
    payload,
  }),
  getShoeInfo: (payload) => ({
    type: actions.GET_SHOE_INFO,
    payload,
  }),
  getActivityInfo: (payload) => ({
    type: actions.GET_ACTIVE_INFO,
    payload,
  }),
  getActivityFee: (payload) => ({
    type: actions.GET_ACTIVE_FEE,
    payload,
  }),
};
export default actions;
